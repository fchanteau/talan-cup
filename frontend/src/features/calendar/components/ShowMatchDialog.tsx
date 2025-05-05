import { DataList, type DialogRootProps } from "@chakra-ui/react";
import { type EventImpl } from "@fullcalendar/core/internal";

import { DialogContainer } from "./DialogContainer";

export type ShowMatchDialogProps = DialogRootProps & {
  match: EventImpl | null;
  onConfirm: () => void;
};

export function ShowMatchDialog(props: ShowMatchDialogProps) {
  const { match, ...restProps } = props;

  return (
    <DialogContainer
      {...restProps}
      label="Match"
      size="lg"
      labelClose="Fermer"
      labelSuccess="OK"
      showFooter={false}
      onSuccess={props.onConfirm}
    >
      <DataList.Root orientation="horizontal">
        <DataList.Item key={match?.id}>
          <DataList.ItemLabel>Match</DataList.ItemLabel>
          <DataList.ItemValue>{match?.title}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item key={match?.id}>
          <DataList.ItemLabel>Heure du match</DataList.ItemLabel>
          <DataList.ItemValue>
            {match?.start?.toLocaleString()}
          </DataList.ItemValue>
        </DataList.Item>
      </DataList.Root>
    </DialogContainer>
  );
}
