import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Props {
    data: { id: number; user: number; points: number; reason: string; createdAt: string | null; deleted_at: string | null; }[] | undefined;
}

export default function PointsTable(props: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Action</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-foreground/20 text-foreground/80">
                {props?.data?.map((point) => (
                    <TableRow key={point.id}>
                        <TableCell className="font-medium">{point.reason}</TableCell>
                        <TableCell className="text-right">{point.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
