import { useLocation } from 'react-router-dom';

const DonateForm = () => {
  const location = useLocation();
  const id = location.state.id;
  const projectName = location.state.name;

    return (
        <h1>{projectName}</h1>
    );
}

export default DonateForm;