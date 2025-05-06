import { Stack, Field, Input, Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  type MatchSchema,
  useMatchSchema,
} from "../../calendar/calendar.model";

import { useAppSelector } from "@/common/store";
import { dateToUnixTime } from "@/common/utils/date";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/chakra/dialog";
import { toaster } from "@/components/chakra/toaster";
import { selectConnectedPlayerId as selectConnectedPlayerId } from "@/features/auth/auth.selector";
import { useAddMatchMutation } from "@/features/match/match.api";
import { PlayerSelect } from "@/features/players/components/PlayerSelect";
import { selectPlayerById } from "@/features/players/players.selector";
import { useToasterHandleError } from "@/hooks/useToaster";

type AddMatchDialogProps = {
  startDate: Date | null;
  endDate: Date | null;
  open: boolean; // Add this
  onOpenChange: () => void; // Add this
  onConfirm?: () => void; // Optional callback after successful submission
};

export function AddMatchDialog(props: AddMatchDialogProps) {
  const { startDate, endDate, open, onOpenChange, onConfirm } = props;
  const homePlayerId = useAppSelector(selectConnectedPlayerId);
  const homePlayer = useAppSelector((state) =>
    selectPlayerById(state, homePlayerId!)
  );

  const [addMatch, { isLoading }] = useAddMatchMutation();

  const matchSchema = useMatchSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MatchSchema>({
    resolver: zodResolver(matchSchema),
  });
  const handleError = useToasterHandleError();

  const onSubmit: SubmitHandler<MatchSchema> = async (data) => {
    try {
      await addMatch({
        homePlayerId: homePlayerId!,
        awayPlayerId: data.awayPlayer,
        startDate: dateToUnixTime(startDate!),
        endDate: dateToUnixTime(endDate!),
      }).unwrap();

      reset();
      // Close dialog and call onConfirm if provided
      onOpenChange();
      onConfirm?.();

      toaster.create({
        title: "Match ajouté",
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
          <DialogTitle>Planifier un match</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack>
            <Field.Root>
              <Field.Label>Début</Field.Label>
              <Input disabled value={startDate?.toLocaleString("fr-FR")} />
            </Field.Root>
            <Field.Root>
              <Field.Label>Fin</Field.Label>
              <Input disabled value={endDate?.toLocaleString("fr-FR")} />
            </Field.Root>
            <Field.Root>
              <Field.Label>Joueur à domicile</Field.Label>
              <Input
                disabled
                value={`${homePlayer?.nameTag} (${homePlayer?.team})`}
              />
            </Field.Root>
            <PlayerSelect
              name="awayPlayer"
              register={register}
              error={errors.awayPlayer}
              excludePlayerId={homePlayerId || undefined}
              label="Joueur extérieur"
              placeholder="Sélectionner un adversaire"
            />
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Annuler</Button>
          </DialogActionTrigger>
          <Button onClick={handleSubmit(onSubmit)} loading={isLoading}>
            Ajouter
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
