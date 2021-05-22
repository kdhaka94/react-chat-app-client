import { gql } from '@apollo/client';

export const User = gql`

    extend type Query {
        IsUserLoggedIn: Boolean!
        # profileParam: User
        # ProfileSelectedUploadAlbumId: ID
        # ProfileSelectedUploadAlbum: Album
        # updatePersonalImage: String
    }

    extend type Mutation {
        LogoutUser: Boolean!
        # SetUpdatePersonalImage(param: String): String
        # SetSelectedProfileUploadAlbumId(param: ID): ID
    }

    extend type User {
        isOnline: Boolean
        sockets: [String]
    }
`;

export default User;