import { Button, DataList } from "@chakra-ui/react";

import { useDeleteMatchMutation } from "../match.api";

import { useAppSelector } from "@/common/store";
import { formatDateTime } from "@/common/utils/date";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/chakra/dialog";
import { toaster } from "@/components/chakra/toaster";
import { selectConnectedPlayerId } from "@/features/auth/auth.selector";
import { selectMatchById } from "@/features/match/match.selector";
import { selectPlayerById } from "@/features/players/players.selector";
import { useToasterHandleError } from "@/hooks/useToaster";

export type ShowMatchDialogProps = {
  matchId: string;
  open: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
};

export function ShowMatchDialog(props: ShowMatchDialogProps) {
  const { matchId, open, onOpenChange, onConfirm } = props;
  const matchData = useAppSelector((state) => selectMatchById(state, matchId));
  const homePlayerData = useAppSelector((state) =>
    selectPlayerById(state, matchData?.homePlayerId)
  );
  const awayPlayerData = useAppSelector((state) =>
    selectPlayerById(state, matchData?.awayPlayerId)
  );
  const playerId = useAppSelector(selectConnectedPlayerId);
  const [deleteMatch, { isLoading }] = useDeleteMatchMutation();
  const handleError = useToasterHandleError();

  const canDeleteMatch =
    matchData?.homePlayerId === playerId ||
    matchData?.awayPlayerId === playerId;

  const onDeleteMatch = async () => {
    try {
      await deleteMatch(matchId).unwrap();
      onOpenChange();
      onConfirm?.();
      toaster.create({
        title: "Match supprimé",
        type: "success",
      });
    } catch (error) {
      handleError(error!);
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange} placement={"center"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Match</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DataList.Root orientation="horizontal">
            <DataList.Item>
              <DataList.ItemLabel>Joueur 1</DataList.ItemLabel>
              <DataList.ItemValue>
                {homePlayerData.firstname} {homePlayerData.lastname}
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Joueur 2</DataList.ItemLabel>
              <DataList.ItemValue>
                {awayPlayerData.firstname} {awayPlayerData.lastname}
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Heure du match</DataList.ItemLabel>
              <DataList.ItemValue>
                {formatDateTime(matchData.startDate)}
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </DialogBody>
        {canDeleteMatch && (
          <DialogFooter>
            <Button
              colorPalette={"red"}
              onClick={onDeleteMatch}
              loading={isLoading}
            >
              Supprimer
            </Button>
          </DialogFooter>
        )}
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
