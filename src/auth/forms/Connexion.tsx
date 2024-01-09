import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import Loader from '../../components/shared/Loader';
import { useSignInAccount } from './../../lib/react-query/queryAndMutations';
import { useUserContext } from "@/context/AuthContext";
import { connexionValidation } from "@/lib/validation";


function Connexion() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount } = useSignInAccount();

  // Définition du formulaire avec les options
  const form = useForm<z.infer<typeof connexionValidation>>({
    resolver: zodResolver(connexionValidation), // Utilise le validateur Zod pour valider les données
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Fonction appelée lors de la soumission du formulaire
  async function onSubmit(values: z.infer<typeof connexionValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) {
      toast({ title: "Login failed. Please try again."});

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

            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>  
            <p className="text-light-3 small-medium md:base-regular">
              Welcome back! Please enter your details
            </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

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
              {isUserLoading ? (
                  <div className="flex-center gap-2">
                    <Loader /> Loading......
                  </div>
                ) : "Sign in"
              }
            </Button>

            <p className="texxt-small-regular text-light-2 text6center mt-2">
              Don't have an account ?
              <Link to="/inscription" className="text-primary-500 text-small-semibold ml-1">
                Sign-up
              </Link>
            </p>
          </form>
        </div>
      </Form>
  )
}

export default Connexion