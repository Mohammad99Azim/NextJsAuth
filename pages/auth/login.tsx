import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { checkUser, getTokenFromSession, routeToIndex } from '../../lib/auth'
import { NO_TOKEN } from '../../lib/constants';

const Login: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    const token = getTokenFromSession()
    if (token !== NO_TOKEN) {
      const validateUser = async () => {
        const user: CheckUserResponse = await checkUser()
        if (user) {
          routeToIndex(router)
        }
      };
      validateUser()
    }
  }, [])

  return (
    <></>
  );
}

export default Login