import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // avigate to different routes within a React application

  const { isLoading, isAuthenticated } = useUser();
  // 1. Load the authenticated user

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 2. If there is NO authenticated user, redirect to the /login

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 3. While loading, show a spinner

  if (isAuthenticated) return children;
  // 4. If there IS a user, render the app
}

export default ProtectedRoute;
