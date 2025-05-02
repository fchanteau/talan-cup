import {
  type SelectRootProps,
  Select,
  Portal,
  Stack,
  Span,
} from "@chakra-ui/react";

import { useDialogContentRef } from "./DialogContainer";

import { type PlayerResponse } from "@/types/TalanCupApi";

export type SelectPlayerProps = SelectRootProps & {
  contentRef: React.RefObject<HTMLDivElement | null>;
  label: string;
};

export function SelectPlayer(props: SelectPlayerProps) {
  const contentRef = useDialogContentRef();

  return (
    <Select.Root
      collection={props.collection}
      size="sm"
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
    >
      <Select.HiddenSelect />
      <Select.Label>{props.label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select plan" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal container={contentRef!}>
        <Select.Positioner>
          <Select.Content>
            {props.collection.items.map((player: PlayerResponse) => (
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
