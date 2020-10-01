import gql from 'graphql-tag';

const MessageMutation = gql`
    mutation SendMessage(
        $text: String!
        ){
        sendMessage(sendMessageInput: {
            text: $text
        }){
            text
        }
    }
`

export default MessageMutation;