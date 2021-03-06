import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { foodPerPage } from '../../config';
import styled from 'styled-components';
import DeleteFood from './DeleteFood';

const ALL_FOODS_QUERY = gql`
    query ALL_FOODS_QUERY($skip: Int = 0, $first: Int = ${foodPerPage}) {
        foods(first: $first, skip: $skip, orderBy: createdAt_DESC) {
            id
            name
            subName
            types
            image
        }
    }
`;

const FoodsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Food = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    background-color: ${ props => props.theme.green };
    text-align: center;
    font-size: ${ props => props.theme.largeFont };
    min-height: 20vh;
    #subName {
        font-weight: bold;
        font-size: ${ props => props.theme.medFont };
    };    
`;

export default function Foods(props) {
  return (
    <Query 
      query={ALL_FOODS_QUERY} 
      variables={
        {
          skip: (props.page || 1) * foodPerPage - foodPerPage
        }
      }
    >
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return (
          <FoodsList>{data.foods.map(food => {
            return (
              <Food key={food.id}>
                <Link to={{ pathname: `/foods/${food.subName + food.name}`, state: { food }}}>
                  <div id='name'>{food.name}</div>
                  <div id='subName'>{food.subName}</div>
                </Link>
                <DeleteFood id={food.id}>Delete</DeleteFood>
              </Food>
            );
          }
          )}</FoodsList>
        );
      }}
    </Query>
  )
}

export { ALL_FOODS_QUERY };
