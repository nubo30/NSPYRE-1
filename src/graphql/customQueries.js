export const listParticipantss = `query ListParticipantss(
    $filter: ModelParticipantsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParticipantss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        contestId
        id
        participantId
        nameUser
        comment
        video {
          localUrl
          url
          name
          type
          blob
        }
        picture {
          localUrl
          url
          name
          type
          blob
        }
        avatar
        createdAt
        likesToParticipants (limit: 100000){
          items {
            participants {
              contestId
              id
              participantId
              nameUser
              comment
              avatar
              createdAt
            }
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        commentsToParticipants(limit: 10000) {
          items {
            participants {
              contestId
              id
              participantId
              nameUser
              comment
              avatar
              createdAt
            }
            id
            name
            idUserComments
            createdAt
            avatar
            comments
            edited
          }
        }
        shareParticipants(limit: 10000) {
          items {
            participants {
              contestId
              id
              participantId
              nameUser
              comment
              avatar
              createdAt
            }
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
        }
        viewsParticipants (limit: 10000) {
          items {
            participants {
              contestId
              id
              participantId
              nameUser
              comment
              avatar
              createdAt
            }
            participantsId
            id
            name
            idUserView
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            createdAt
            avatar
          }
        }
      }
    }
  }
  `