import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

const canSSRAuth = async (ctx: GetServerSidePropsContext) => {
    const {req} = ctx;
    const cookies = parseCookies({ req })
    const token = cookies["auth_token"]
    if(!token) {
        
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      }
    }

    return {
      props: {}
    }
  }

  export default canSSRAuth;