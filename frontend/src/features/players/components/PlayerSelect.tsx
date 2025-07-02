import { NativeSelect, For, Field } from "@chakra-ui/react";
import { type FieldError } from "react-hook-form";

import { useAppSelector } from "@/common/store";
import { selectAllPlayers } from "@/features/players/players.selector";

type PlayerSelectProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: FieldError;
  excludePlayerId?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function PlayerSelect({
  name,
  register,
  error,
  excludePlayerId,
  label = "Joueur",
  placeholder = "Sélectionner un joueur",
  disabled = false,
}: PlayerSelectProps) {
  const playersData = useAppSelector(selectAllPlayers);

  // Filter out the excluded player if provided
  const availablePlayers = excludePlayerId
    ? playersData.filter((player) => player.playerId !== excludePlayerId)
    : playersData;

  return (
    <Field.Root invalid={!!error}>
      {label && <Field.Label>{label}</Field.Label>}
      <NativeSelect.Root size="sm">
        <NativeSelect.Field
          placeholder={placeholder}
          disabled={disabled}
          {...register(name)}
        >
          <For each={availablePlayers}>
            {(player) => (
              <option value={player.playerId} key={player.playerId}>
                {`${player.firstname} ${player.lastname}`}
              </option>
            )}
          </For>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
    </Field.Root>
  );
}
