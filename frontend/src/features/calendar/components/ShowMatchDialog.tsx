import { Button, DataList, type DialogRootProps } from "@chakra-ui/react";
import { type EventImpl } from "@fullcalendar/core/internal";

import { useAppSelector } from "@/common/store";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/chakra/dialog";
import { selectConnectedPlayerId } from "@/features/auth/auth.selector";
import { selectMatchById } from "@/features/match/match.selector";

export type ShowMatchDialogProps = DialogRootProps & {
  match: EventImpl | null;
  onConfirm: () => void;
};

export function ShowMatchDialog(props: ShowMatchDialogProps) {
  const { match, ...restProps } = props;
  const matchData = useAppSelector((state) =>
    selectMatchById(state, match?.id ?? "")
  );
  const playerId = useAppSelector(selectConnectedPlayerId);

  const canDeleteMatch =
    matchData?.homePlayerId === playerId ||
    matchData?.awayPlayerId === playerId;

  return (
    <DialogRoot {...restProps}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Match</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DataList.Root orientation="horizontal">
            <DataList.Item>
              <DataList.ItemLabel>Match</DataList.ItemLabel>
              <DataList.ItemValue>{match?.title}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Heure du match</DataList.ItemLabel>
              <DataList.ItemValue>
                {match?.start?.toLocaleString()}
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </DialogBody>
        {canDeleteMatch && (
          <DialogFooter>
            <Button colorPalette={"red"}>Supprimer</Button>
          </DialogFooter>
        )}
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
