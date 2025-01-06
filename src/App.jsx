import {
  useFetchData,
  useLogin,
  useReIssue,
  useSignUp,
  useValidationId,
} from "./query";

// eslint-disable-next-line react/prop-types
const Section = ({ onClick, label, error }) => {
  return (
    <section style={{ display: "flex" }}>
      <button onClick={onClick}>{label}</button>
      <div>{error}</div>
    </section>
  );
};

function App() {
  const { mutate: signUp, error: signUpError } = useSignUp();
  const { mutate: validate, error: validateError } = useValidationId();
  const { mutate: login, error: loginError } = useLogin();
  const { mutate: reIssue, error: reIssueError } = useReIssue();
  const { data, refetch } = useFetchData();

  const cookies = Object.fromEntries(
    document.cookie.split(";").map((cookie) => cookie.trim().split("="))
  );

  console.log(cookies);

  return (
    <>
      <Section
        onClick={validate}
        label={"중복 검사"}
        error={validateError?.message}
      />
      <Section
        onClick={signUp}
        label={"회원가입"}
        error={signUpError?.message}
      />
      <Section onClick={login} label={"로그인"} error={loginError?.message} />
      <Section
        onClick={reIssue}
        label={"재발급"}
        error={reIssueError?.message}
      />
      <button onClick={refetch}>데이터 가져오기</button>
      <div>데이터: {data?.msg}</div>
    </>
  );
}

export default App;
