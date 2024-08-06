import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContactContext } from "@/contexts/ContactsContext";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const imageSchema = z.instanceof(File).refine(
  (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  },
  {
    message:
      "Invalid image file. Only JPEG, PNG, and GIF files under 5MB are allowed.",
  }
);

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30),
  email: z.string().regex(emailRegex, {
    message: "Invalid email format!",
  }),
  phoneNumber: z
    .string()
    .min(11, {
      message: "Phone number must be at least 11 characters like: 09088888888",
    })
    .max(14, {
      message: "Phone number cannot exceed 14 characters. e.g., 2359099999999",
    }),
  image: imageSchema.optional(),
});

const AddContactForm = ({ onClose }) => {
  const { addNewContact } = useContactContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      image: null,
    },
  });


  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="09088888888" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          className="bg-orange py-2 px-4 text-white"
          onClick={(e) => {
            e.preventDefault();
            addNewContact(form.getValues())
          }}
        >
          Submit
        </button>
      </form>
    </Form>
  );
};

export default AddContactForm;
