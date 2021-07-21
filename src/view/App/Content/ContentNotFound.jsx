import AppStatus from '../AppStatus';

const ContentNotFound = () => (
  <AppStatus code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </AppStatus>
);

export default ContentNotFound;
