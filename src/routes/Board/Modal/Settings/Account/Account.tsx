import SaveButton from "../../../../../components/button/SaveButton";
import { useSafeUserContext } from "../../../../../context/AuthenticationContext";

const Account = () => {
  const { user } = useSafeUserContext();

  console.log(user);
  const submitName = (e: any) => {
    e.preventDefault();
  };

  return (
    <section>
      <div>
        <strong>Update your name</strong>
        <form onSubmit={submitName}>
          <input type="text" />
          <SaveButton type="submit">Save</SaveButton>
        </form>
      </div>

      <div>
        <strong>Update your phone number</strong>
        <form onSubmit={submitName}>
          <input type="text" />
          <SaveButton type="submit">Save</SaveButton>
        </form>
      </div>
    </section>
  );
};

export default Account;
