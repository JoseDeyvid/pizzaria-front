import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

const canSSRGuest = async (ctx: GetServerSidePropsContext) => {
    const {req} = ctx;
    const cookies = parseCookies({ req })
    const token = cookies["auth_token"]
    if(token) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false
        }
      }
    }
    return {
      props: {}
    }
  }

  export default canSSRGuest;