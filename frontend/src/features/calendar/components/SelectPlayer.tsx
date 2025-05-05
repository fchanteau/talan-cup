import {
  type SelectRootProps,
  Select,
  Stack,
  Span,
  createListCollection,
  SelectValueText,
} from "@chakra-ui/react";

import { useDialogContentRef } from "../hooks/useDialogContentRef";

import { useAppSelector } from "@/common/store";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from "@/components/chakra/select";
import { useGetPlayersQuery } from "@/features/players/players.api";
import { selectAllPlayers } from "@/features/players/players.selector";
import { type PlayerResponse } from "@/types/TalanCupApi";

export type SelectPlayerProps = Omit<SelectRootProps, "collection"> & {
  label: string;
};

export function SelectPlayer(props: SelectPlayerProps) {
  const contentRef = useDialogContentRef();

  const { isLoading } = useGetPlayersQuery();
  const playersData = useAppSelector(selectAllPlayers);

  const players = createListCollection({
    items: playersData ?? [],
    itemToString: (item) => `${item.nameTag} (${item.team})`,
    itemToValue: (item) => item.playerId,
  });

  return (
    <SelectRoot
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
      disabled={isLoading}
      {...props}
      collection={players}
    >
      <SelectLabel>{props.label}</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Selectionner le joueur" />
      </SelectTrigger>
      <SelectContent portalRef={contentRef}>
        {players.items.map((player: PlayerResponse) => (
          <SelectItem item={player} key={player.playerId}>
            <Stack gap="0">
              <Select.ItemText>{player.nameTag}</Select.ItemText>
              <Span color="fg.muted" textStyle="xs">
                {player.team}
              </Span>
            </Stack>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
