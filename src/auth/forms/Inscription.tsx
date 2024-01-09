import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { inscriptionValidation } from './../../lib/validation/index';
import { z } from "zod"
import Loader from '../../components/shared/Loader';
import { useCreateUserAccount, useSignInAccount } from './../../lib/react-query/queryAndMutations';
import { useUserContext } from "@/context/AuthContext";


function Inscription() {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();
  // const isLoading = false;

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();

  const { mutateAsync: signInAccount } = useSignInAccount();

  // Définition du formulaire avec les options
  const form = useForm<z.infer<typeof inscriptionValidation>>({
    resolver: zodResolver(inscriptionValidation), // Utilise le validateur Zod pour valider les données
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Fonction appelée lors de la soumission du formulaire
  async function onSubmit(values: z.infer<typeof inscriptionValidation>) {
    // Appelle la fonction pour créer un nouvel utilisateur avec les valeurs du formulaire
    const newUser = await createUserAccount(values);    

    if (!newUser){
      return toast({ title: "Sign up failed. Please try again" })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) {
      toast({ title: "Something went wrong. Please login your new account", });
        
        navigate("/connexion");
        
        return;
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();

      navigate("/");
    } else {
      toast({ title: "Login failed. Please try again."});

      return;
    } 

    
  }

  return (
      <Form {...form}>

        <div className="sm:w-420 flex-center flex-col">
          {/* Mon logo Micgram */}
            <img src="/assets/images/logo.png" style={{
              height: "150px"
            }} />

            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
            <p className="text-light-3 small-medium md:base-regular">
              To use Micgram enter your details
            </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

            {/* Champs du nom */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Le champs du prenom */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Le champs email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Le champs pour le mot de passe */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Le bouton our l'envoi du formulaire*/}
            <Button type="submit" className="shad-button_primary">
              {isCreatingAccount ? (
                  <div className="flex-center gap-2">
                    <Loader /> Loading......
                  </div>
                ) : "Sign up"
              }
            </Button>

            <p className="text-small-regular text-light-2 text6center mt-2">
              Already have an account? 
              <Link to="/connexion" className="text-primary-500 text-small-semibold ml-1">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
  )
}

export default Inscription