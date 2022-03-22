import { UserContext } from '../../context/userContext';

function Dashboard() {
  return (
    <UserContext.Consumer>
      {(value) => <div>This is the dashboard page for {value.email}</div>}
    </UserContext.Consumer>
  );
}

export default Dashboard;
