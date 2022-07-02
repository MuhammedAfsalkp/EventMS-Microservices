import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './LoginCard.css';

const LoginCard = props => {
  const auth = useContext(AuthContext);


  return (
    <li className="card-item">
      <Card className="card-item__content" onClick={()=>{auth.authMode(props.role)}}>
        <Link to={`/auth`}>
          <div className="card-item__image">
            <Avatar image={`${props.image}`} alt={props.name} />
          </div>
          <div className="card-item__info">
            <h2>{props.name}</h2>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default LoginCard;