import { Button } from "@/shared/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

// **1**: only pull `useForm` from RHF
import { useForm, type SubmitHandler } from "react-hook-form";
// **2**: import your Form wrapper
import { Form } from "@/shared/ui/form";

export const FilterTable: React.FC = ({setFilters}) => {
  const form = useForm<{
    username: string;
  }>({
    defaultValues: {
      selectHub: {
        id: 2,
        value: "B1",
        label: "هاب تهران",
        parent: null,
        children: null,
        text: "هاب تهران",
      },
      orderDate: {
        day: 14,
        month: 10,
        year: 1402,
      },
    },
  });

  const onSubmit: SubmitHandler<{ username: string }> = (values) => {
    console.log(values);
    setFilters(values)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
