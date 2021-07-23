import { gql } from 'apollo-server';
import { GraphQLScalarType, Kind } from 'graphql';

// Writing a custom scalar type for date
export const dateScalar = new GraphQLScalarType ({
        name: 'Date',
        description: 'Date custom scalar type',
        serialize(value) {
            return value.getTime();
        },
        parseValue(value) {
            return new Date(value);
        },
        parseLiteral(ast) {
            if(ast.kind === Kind.INT) {
                return new Date(parseInt(ast.value, 10));
            }
            return null;
        }
    });


const typedefs = gql`
    scalar Date

    type Query {
        getUser: [User!]
    }

    # type Mutation {

    # }

    type User {
        id: ID!
        fullname: String!
        email: String!
        username: String!
        country: String!
        password: String!
        isActivated: Boolean
        avatar: String
        accountBalance: Int!
        createdAt: Date!
        updatedAt: Date
        transactions: [Transaction!]
    }

    type Transaction {
        id:ID!
        amount:Int!
        transactionStatus: String!
        senderId:ID!
        receiverId:ID!
        transactedAt:Date!
    }

    enum transactionStatus {
        PENDING
        SUCCESSFUL
        FAILED
    }
`;

export default typedefs;