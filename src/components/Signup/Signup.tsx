import * as React from "react";
import { Input } from "../shared/Input/Input";
import { classNames } from "../../../utils/utils";
import { DefaultButton } from "../shared/Button/DefaultButton/DefaultButton";
import { createFirebaseUser } from "../../config/firebase/auth/authentication";

interface ISignupState {
  email: string;
  password: string;
}

class Signup extends React.Component<{}, ISignupState> {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  static styleClass = {
    formWrapper: classNames(
      "ulv__absolute",
      "ulv__pin",
      "ulv__m-auto",
      "ulv__bg-green-primary",
      "ulv__min-w-md",
      "ulv__max-w-lg",
      "ulv__max-h-sm",
      "ulv__z-50"
    ),
    form: classNames("ulv__flex", "ulv__flex-col", "ulv__p-16"),
    button: classNames("ulv__bg-green-tertiary", "ulv__w-48"),
    input: classNames("ulv__mb-4")
  };

  createUserWithEmailAndPassword(event) {
    const { email, password } = this.state;
    event.preventDefault();
    createFirebaseUser(email, password);
  }

  render() {
    return (
      <div className={Signup.styleClass.formWrapper}>
        <form
          className={Signup.styleClass.form}
          onSubmit={e => this.createUserWithEmailAndPassword(e)}
        >
          <Input
            className={Signup.styleClass.input}
            placeholder={"Email"}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input
            className={Signup.styleClass.input}
            placeholder={"Password"}
            type={"password"}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <DefaultButton
            text={"Registrer Bruker"}
            className={Signup.styleClass.button}
            type="submit"
          />
        </form>
      </div>
    );
  }
}

export default Signup;
