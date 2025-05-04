import {
  type SelectRootProps,
  Select,
  Portal,
  Stack,
  Span,
  createListCollection,
} from "@chakra-ui/react";

import { useDialogContentRef } from "./DialogContainer";

import { useGetPlayersQuery } from "@/features/players/players.api";
import { type PlayerResponse } from "@/types/TalanCupApi";
import { useAppSelector } from "@/common/store";
import { selectAllPlayers } from "@/features/players/players.selector";

export type SelectPlayerProps = Omit<SelectRootProps, 'collection'> & {
  contentRef: React.RefObject<HTMLDivElement | null>;
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
    <Select.Root
      collection={players}
      size="sm"
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
      disabled={isLoading}
    >
      <Select.HiddenSelect />
      <Select.Label>{props.label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select player" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal container={contentRef!}>
        <Select.Positioner>
          <Select.Content>
            {players.items.map((player: PlayerResponse) => (
              <Select.Item item={player} key={player.playerId}>
                <Stack gap="0">
                  <Select.ItemText>{player.nameTag}</Select.ItemText>
                  <Span color="fg.muted" textStyle="xs">
                    {player.team}
                  </Span>
                </Stack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
