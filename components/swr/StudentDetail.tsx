import useSWR from "swr";

export interface StudentDetailProps {
  studentId: string
}

export function StudentDetail ({studentId}: StudentDetailProps) {

  const {data, error, mutate, isValidating} = useSWR(`/students/${studentId}`);

  return (
    <div>
      Name: {data?.name || "--"}
    </div>
  )
}