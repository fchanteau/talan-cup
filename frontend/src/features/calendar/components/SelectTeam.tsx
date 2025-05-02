import {
  type SelectRootProps,
  createListCollection,
  Select,
  Portal,
} from "@chakra-ui/react";

import { useDialogContentRef } from "./DialogContainer";

import { TEAMS } from "@/features/teams/teams.model";

export type SelectTeamProps = SelectRootProps & {
  contentRef: React.RefObject<HTMLDivElement | null>;
};

export function SelectTeam(props: SelectTeamProps) {
  const contentRef = useDialogContentRef();
  const teams = createListCollection({
    items: TEAMS,
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id,
  });

  return (
    <Select.Root
      collection={props.collection}
      size="sm"
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Sélectionne l'équipe" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal container={contentRef!}>
        <Select.Positioner>
          <Select.Content>
            {teams.items.map((team) => (
              <Select.Item item={team} key={team.id}>
                {team.name}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
