import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  interface Props {
    trigger: React.ReactNode
    action: () => void
    title?: string
    description?: string
  }
  
  export function AlertDialogComponent(props: Props) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {props.trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{props.title || "Alert"}</AlertDialogTitle>
            <AlertDialogDescription>
              {props.description || "Do you wish to continue?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
                <button className="cursor-pointer" onClick={props.action}>Continue</button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  