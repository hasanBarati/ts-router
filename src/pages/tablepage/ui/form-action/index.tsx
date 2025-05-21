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
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      destinationHub: null,
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
              name="destinationHub"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>هاب مقصد</FormLabel>
                  <FormControl>
                    <AsyncPopoverSelect
                      url="/core-api/hub/select"
                      queryKey={["selectdestinationHub"]}
                      value={field.value}
                      onChange={field.onChange}
                      label="هاب مقصد"
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
                    <Input placeholder="نام را وارد کنید" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <Input placeholder="ایمیل را وارد کنید" {...field} />
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
