import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { formSchema, type FormValues } from "../../model/form-types";
import { useFormMutation } from "../../lib/use-form-mutation";
import { AsyncPopoverSelect } from "@/features/async-select/async-select";

export function FormAction() {
  const form = useForm<FormValues>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      code:"",
      selectHub:null
      // selectSourceHub: null,
      // selectDestinationHub: null,
      // selectBagTypes: null,
      // selectConsignmentsDestinationHub: null,
      // selectCarrier: null,
      // weightCapacity: "",
      // volumeCapacity: "",
    },
  });

  const mutation = useFormMutation(() => {
    form.reset();
  });

  function onSubmit(data: FormValues) {
    mutation.mutate(data);
  }

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant="outline">افزودن کاربر</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] portal">
        <DialogHeader>
          <DialogTitle>افزودن کاربر جدید</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
   
            <FormField
              control={form.control}
              name="selectHub"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>هاب مبدا</FormLabel>
                  <FormControl>
                    <AsyncPopoverSelect
                      url="/core-api/hub/select"
                      queryKey={["selectHub"]}
                      value={field.value}
                      onChange={field.onChange}
                      label="هاب مبدا"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input  placeholder="نام" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کد</FormLabel>
                  <FormControl>
                    <Input  placeholder="کد" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
