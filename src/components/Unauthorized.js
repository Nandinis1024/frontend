import './Unauthorized.css';

function Unauthorized() {
  return (
    <div className="unauthorized-container">
      <h1 className="unauthorized-heading">Unauthorized</h1>
      <p className="unauthorized-message">You are not authorized to view this page.</p>
    </div>
  );
}

export default Unauthorized;