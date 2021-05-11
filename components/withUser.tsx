import router from 'next/router'
import { ComponentType, useEffect, useState } from 'react'
import { checkUser, getTokenFromSession, routeToLogin } from '../lib/auth';
import { initUser, NO_TOKEN } from '../lib/constants'

export default function withCedent(WrappedComponent: ComponentType<any>) {
  if (!WrappedComponent) return null;

  const Component = () => {
    const [user, setUser] = useState<CheckUserResponse>(initUser)

    useEffect(() => {
      const token = getTokenFromSession()
      if (token === NO_TOKEN) {
        routeToLogin(router)
        return
      }
      const authenticateUser = async () => {
        const userResponse: CheckUserResponse = await checkUser()
        if (!userResponse) {
          routeToLogin(router)
          return
        }
        setUser(userResponse)
      }
      authenticateUser()
    }, [])

    return <WrappedComponent user={user} />;
  };

  return Component;
};