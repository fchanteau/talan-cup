import {
  type DialogRootProps,
  createListCollection,
  Stack,
  Field,
  Input,
  type SelectValueChangeDetails,
} from "@chakra-ui/react";
import { type EventInput } from "@fullcalendar/core/index.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useMemo } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { DialogContainer } from "./DialogContainer";
import { SelectTeam } from "./SelectTeam";
import { type MatchSchema, useMatchSchema } from "../calendar.model";

import { selectTeamById, TEAMS } from "@/features/teams/teams.model";

type EventDialogProps = DialogRootProps & {
  startDate: Date;
  endDate: Date;
  onAddEvent?: (event: EventInput) => void;
};

export function EventDialog(props: EventDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { startDate, endDate, onAddEvent, ...restProps } = props;

  const teams = useMemo(() => {
    return createListCollection({
      items: TEAMS,
      itemToString: (item) => item.name,
      itemToValue: (item) => item.id,
    });
  }, []);

  const matchSchema = useMatchSchema();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MatchSchema>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      startDate: startDate,
      endDate: endDate,
      homeTeam: [],
      homePlayer: undefined,
      awayTeam: [],
      awayPlayer: undefined,
    },
  });

  const onSubmit: SubmitHandler<MatchSchema> = (data) => {
    // if (startDate && endDate) {
    //   const homeTeamData = selectTeamById(homeTeam!);
    //   const awayTeamData = selectTeamById(awayTeam!);
    //   const event: EventInput = {
    //     title: `${homeTeamData?.name} (${homePlayer}) vs ${awayTeamData?.name} (${awayPlayer})`,
    //     start: startDate,
    //     end: endDate,
    //   };
    //   onAddEvent?.(event);
    // }

    console.log(data);
  };

  return (
    <DialogContainer
      label="Planifier un match"
      onSuccess={handleSubmit(onSubmit)}
      labelSuccess={"Ajouter"}
      labelClose={"Annuler"}
      {...restProps}
    >
      <Stack>
        <Field.Root>
          <Field.Label>Début</Field.Label>
          <Input disabled value={startDate?.toLocaleString("fr-FR")} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Fin</Field.Label>
          <Input disabled value={endDate?.toLocaleString("fr-FR")} />
        </Field.Root>
        <Stack direction="row" gap={4}>
          <Field.Root>
            <Field.Label>Equipe à domicile</Field.Label>
            <Controller
              control={control}
              name="homeTeam"
              render={({ field }) => (
                <SelectTeam
                  name={field.name}
                  value={field.value}
                  contentRef={contentRef}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={teams}
                />
              )}
            />
            <Field.ErrorText>{errors.homeTeam?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.homePlayer}>
            <Field.Label>Joueur</Field.Label>
            <Input {...register("homePlayer")} />
            <Field.ErrorText>{errors.homePlayer?.message}</Field.ErrorText>
          </Field.Root>
        </Stack>
        <Stack direction="row" gap={4}>
          <Field.Root invalid={!!errors.awayTeam}>
            <Field.Label>Equipe à l'extérieur</Field.Label>
            <Controller
              control={control}
              name="awayTeam"
              render={({ field }) => (
                <SelectTeam
                  name={field.name}
                  value={field.value}
                  contentRef={contentRef}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={teams}
                />
              )}
            />
            <Field.ErrorText>{errors.awayTeam?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Joueur</Field.Label>
            <Input {...register("awayPlayer")} />
            <Field.ErrorText>{errors.awayPlayer?.message}</Field.ErrorText>
          </Field.Root>
        </Stack>
      </Stack>
    </DialogContainer>
  );
}

export function D() {}
