import {
  type DialogRootProps,
  Stack,
  Field,
  Input,
} from "@chakra-ui/react";
import { type EventInput } from "@fullcalendar/core/index.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { DialogContainer } from "./DialogContainer";
import { SelectPlayer } from "./SelectPlayer";
import { type MatchSchema, useMatchSchema } from "../calendar.model";

import { dateToUnixTime } from "@/common/utils/date";
import { useAddMatchMutation } from "@/features/match/match.api";

type AddEventDialogProps = DialogRootProps & {
  startDate: Date | null;
  endDate: Date | null;
  onAddEvent?: (event: EventInput) => void;
};

export function AddEventDialog(props: AddEventDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { startDate, endDate, ...restProps } = props;
  const [addMatch] = useAddMatchMutation();

  const matchSchema = useMatchSchema();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MatchSchema>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      homePlayer: [],
      awayPlayer: [],
    },
  });

  const onSubmit: SubmitHandler<MatchSchema> = (data) => {
    console.log(data);
    // const homeTeamData = selectTeamById(data.homePlayer[0]);
    // const awayTeamData = selectTeamById(data.awayPlayer[0]);
    // const event: EventInput = {
    //   title: `${homeTeamData?.name} (${data.homePlayer}) vs ${awayTeamData?.name} (${data.awayPlayer})`,
    //   start: startDate!,
    //   end: endDate!,
    // };
    addMatch({
      homePlayerId: data.homePlayer[0],
      awayPlayerId: data.awayPlayer[0],
      startDate: dateToUnixTime(startDate!),
      endDate: dateToUnixTime(endDate!),
    });
  };

  return (
    <DialogContainer
      label="Planifier un match"
      onSuccess={handleSubmit(onSubmit)}
      labelSuccess={"Ajouter"}
      labelClose={"Annuler"}
      placement={"center"}
      {...restProps}
    >
      <Stack>
        {JSON.stringify(errors.homePlayer)}
        <Field.Root>
          <Field.Label>Début</Field.Label>
          <Input disabled value={startDate?.toLocaleString("fr-FR")} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Fin</Field.Label>
          <Input disabled value={endDate?.toLocaleString("fr-FR")} />
        </Field.Root>
        <Field.Root invalid={!!errors.homePlayer}>
          <Controller
            control={control}
            name="homePlayer"
            render={({ field }) => (
              <SelectPlayer
                label="Joueur domicile"
                name={field.name}
                value={field.value}
                contentRef={contentRef}
                onValueChange={({ value }) => {
                  console.log(value);
                  field.onChange(value);
                }}
                onInteractOutside={() => field.onBlur()}
              />
            )}
          />
          <Field.ErrorText>{errors.homePlayer?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.awayPlayer}>
          <Controller
            control={control}
            name="awayPlayer"
            render={({ field }) => (
              <SelectPlayer
                label="Joueur extérieur"
                name={field.name}
                value={field.value}
                contentRef={contentRef}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
              />
            )}
          />
          <Field.ErrorText>{errors.awayPlayer?.message}</Field.ErrorText>
        </Field.Root>
      </Stack>
    </DialogContainer>
  );
}
