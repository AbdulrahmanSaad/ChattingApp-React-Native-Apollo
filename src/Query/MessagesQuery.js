import gql from 'graphql-tag';

const MessagesQuery = gql`
{
    messages{
    _id
    text
    }
}
`

export default MessagesQuery; 