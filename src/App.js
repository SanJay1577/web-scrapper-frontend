import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import { FrontPage } from "./FrontPage";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { ForgetPassword } from "./ForgetPassword";
import { PasswordReset } from "./PasswordReset";
import { DemoLogin } from "./DemoLogin";
import { DashPage } from "./DashPage";
import { AmazonDash } from "./AmazonDash";
import { FlipkartDash } from "./FlipkartDash";
import { VerifyEmail } from "./VerifyEmail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <FrontPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/demo-login">
          <DemoLogin />
        </Route>

        <Route path="/signup">
          <SignupPage />
        </Route>

        <Route path="/forget-password">
          <ForgetPassword />
        </Route>

        <Route path="/password-reset/:id/:token">
          <PasswordReset />
        </Route>

        <Route path="/users/:id/verify/:token">
          <VerifyEmail />
        </Route>

        <Route path="/dash-page">
          <DashPage />
        </Route>

        <Route path="/amazon-dash">
          <AmazonDash />
        </Route>

        <Route path="/flipkart-dash">
          <FlipkartDash />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
