
export type Train = {
  number: string;
  name: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  fare: number;
};

type TrainResponse = {
  success: boolean;
  count?: number;
  data?: Train[];
  message?: string;
  demo?: boolean;
};

export async function searchTrains(
  from: string,
  to: string
): Promise<Train[]> {
  const params = new URLSearchParams({
    from,
    to,
  });

  const response = await fetch(`/api/trains?${params.toString()}`);

  const result: TrainResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? "Unable to search trains.");
  }

  return result.data ?? [];
}