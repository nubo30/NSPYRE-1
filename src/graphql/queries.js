// eslint-disable
// this is an auto generated file. This will be overwritten

export const showParticipationByUser = `query ShowParticipationByUser($userId: String!) {
  showParticipationByUser(userId: $userId)
}
`;
export const filterAudienceForContest = `query FilterAudienceForContest($preferences: String!) {
  filterAudienceForContest(preferences: $preferences)
}
`;
export const sendNotification = `query SendNotification($notificationId: String!) {
  sendNotification(notificationId: $notificationId)
}
`;
export const trending = `query Trending($params: String) {
  trending(params: $params)
}
`;
export const listContest = `query ListContest($category: String) {
  listContest(category: $category)
}
`;
export const listCaseOfSuccess = `query ListCaseOfSuccess($params: String) {
  listCaseOfSuccess(params: $params)
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    tokenfb
    id
    userId
    name
    username
    lastname
    email
    avatar
    phone
    datetime
    scope
    createContest {
      items {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheUser {
          companyName
          location {
            city
            country
            state
            street
          }
          titleInTheCompany
        }
        category
        general {
          description
          instructions
          nameOfContest
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        prizes {
          description
          prizeId
          name
          picture {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        timer {
          start
          end
        }
        showInCaseOfSuccess
        audience {
          items {
            id
            contest
            usersFound
            aboutThePersonality
            aboutTheOccupations
            createdAt
          }
          nextToken
        }
        participants {
          items {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          nextToken
        }
        usersSharing {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          nextToken
        }
        usersLikes {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        viewsVideo {
          items {
            id
            name
            idUserView
            createdAt
            avatar
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            engageData
          }
          nextToken
        }
      }
      nextToken
    }
    submitPrize {
      items {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheCompany {
          businessLocation {
            city
            country
            state
            street
          }
          companyName
          generalInformation
        }
        category
        general {
          price
          nameOfPrize
          description
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        share {
          contentUserShare
          footerContent
          socialMediaHandle
          whatUserDo
        }
      }
      nextToken
    }
    engage {
      items {
        expoPushToken
        JSONdata
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutThePersonality {
          age
          amountOfChildren
          amountOfSimblings
          birthDate
          gender
          location {
            city
            country
            state
            street
          }
          maritalStatus
          nacionality
          parentalCondition
          regionalIdentity
          sexuality
        }
        aboutTheOccupations {
          levelAchivied
          occupation
          rentOrOwnCar
          rentOrOwnHouse
          schools
          university
          socioeconomicLevel
          political
        }
        createdAt
      }
      nextToken
    }
    coins
    notificationToken
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      tokenfb
      id
      userId
      name
      username
      lastname
      email
      avatar
      phone
      datetime
      scope
      createContest {
        items {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        nextToken
      }
      submitPrize {
        items {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheCompany {
            companyName
            generalInformation
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          share {
            contentUserShare
            footerContent
            socialMediaHandle
            whatUserDo
          }
        }
        nextToken
      }
      engage {
        items {
          expoPushToken
          JSONdata
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutThePersonality {
            age
            amountOfChildren
            amountOfSimblings
            birthDate
            gender
            maritalStatus
            nacionality
            parentalCondition
            regionalIdentity
            sexuality
          }
          aboutTheOccupations {
            levelAchivied
            occupation
            rentOrOwnCar
            rentOrOwnHouse
            schools
            university
            socioeconomicLevel
            political
          }
          createdAt
        }
        nextToken
      }
      coins
      notificationToken
    }
    nextToken
  }
}
`;
export const getCreateContest = `query GetCreateContest($id: ID!) {
  getCreateContest(id: $id) {
    id
    user {
      tokenfb
      id
      userId
      name
      username
      lastname
      email
      avatar
      phone
      datetime
      scope
      createContest {
        items {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        nextToken
      }
      submitPrize {
        items {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheCompany {
            companyName
            generalInformation
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          share {
            contentUserShare
            footerContent
            socialMediaHandle
            whatUserDo
          }
        }
        nextToken
      }
      engage {
        items {
          expoPushToken
          JSONdata
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutThePersonality {
            age
            amountOfChildren
            amountOfSimblings
            birthDate
            gender
            maritalStatus
            nacionality
            parentalCondition
            regionalIdentity
            sexuality
          }
          aboutTheOccupations {
            levelAchivied
            occupation
            rentOrOwnCar
            rentOrOwnHouse
            schools
            university
            socioeconomicLevel
            political
          }
          createdAt
        }
        nextToken
      }
      coins
      notificationToken
    }
    aboutTheUser {
      companyName
      location {
        city
        country
        state
        street
      }
      titleInTheCompany
    }
    category
    general {
      description
      instructions
      nameOfContest
      picture {
        localUrl
        url
        name
        type
        blob
      }
      video {
        localUrl
        url
        name
        type
        blob
      }
    }
    prizes {
      description
      prizeId
      name
      picture {
        localUrl
        url
        name
        type
        blob
      }
    }
    createdAt
    timer {
      start
      end
    }
    showInCaseOfSuccess
    audience {
      items {
        createContest {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        id
        contest
        usersFound
        aboutThePersonality
        aboutTheOccupations
        createdAt
      }
      nextToken
    }
    participants {
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
        contest {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        createdAt
        engageData
        likesToParticipants {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
            engageData
          }
          nextToken
        }
        commentsToParticipants {
          items {
            id
            name
            idUserComments
            createdAt
            avatar
            comments
            edited
            engageData
          }
          nextToken
        }
        shareParticipants {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
            engageData
          }
          nextToken
        }
        viewsParticipants {
          items {
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
            engageData
          }
          nextToken
        }
      }
      nextToken
    }
    usersSharing {
      items {
        createContest {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        id
        name
        idUserSharing
        whereItHasBeenShared
        createdAt
        avatar
      }
      nextToken
    }
    usersLikes {
      items {
        createContest {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        id
        name
        idUserLike
        createdAt
        avatar
      }
      nextToken
    }
    viewsVideo {
      items {
        createContest {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        id
        name
        idUserView
        createdAt
        avatar
        uri
        didJustFinish
        durationMillis
        positionMillis
        isPaused
        engageData
      }
      nextToken
    }
  }
}
`;
export const listCreateContests = `query ListCreateContests(
  $filter: ModelCreateContestFilterInput
  $limit: Int
  $nextToken: String
) {
  listCreateContests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        tokenfb
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        createContest {
          items {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          nextToken
        }
        submitPrize {
          items {
            id
            category
            createdAt
          }
          nextToken
        }
        engage {
          items {
            expoPushToken
            JSONdata
            createdAt
          }
          nextToken
        }
        coins
        notificationToken
      }
      aboutTheUser {
        companyName
        location {
          city
          country
          state
          street
        }
        titleInTheCompany
      }
      category
      general {
        description
        instructions
        nameOfContest
        picture {
          localUrl
          url
          name
          type
          blob
        }
        video {
          localUrl
          url
          name
          type
          blob
        }
      }
      prizes {
        description
        prizeId
        name
        picture {
          localUrl
          url
          name
          type
          blob
        }
      }
      createdAt
      timer {
        start
        end
      }
      showInCaseOfSuccess
      audience {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          contest
          usersFound
          aboutThePersonality
          aboutTheOccupations
          createdAt
        }
        nextToken
      }
      participants {
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
          contest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          createdAt
          engageData
          likesToParticipants {
            nextToken
          }
          commentsToParticipants {
            nextToken
          }
          shareParticipants {
            nextToken
          }
          viewsParticipants {
            nextToken
          }
        }
        nextToken
      }
      usersSharing {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        nextToken
      }
      usersLikes {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserLike
          createdAt
          avatar
        }
        nextToken
      }
      viewsVideo {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserView
          createdAt
          avatar
          uri
          didJustFinish
          durationMillis
          positionMillis
          isPaused
          engageData
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getViewsVideo = `query GetViewsVideo($id: ID!) {
  getViewsVideo(id: $id) {
    createContest {
      id
      user {
        tokenfb
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        createContest {
          items {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          nextToken
        }
        submitPrize {
          items {
            id
            category
            createdAt
          }
          nextToken
        }
        engage {
          items {
            expoPushToken
            JSONdata
            createdAt
          }
          nextToken
        }
        coins
        notificationToken
      }
      aboutTheUser {
        companyName
        location {
          city
          country
          state
          street
        }
        titleInTheCompany
      }
      category
      general {
        description
        instructions
        nameOfContest
        picture {
          localUrl
          url
          name
          type
          blob
        }
        video {
          localUrl
          url
          name
          type
          blob
        }
      }
      prizes {
        description
        prizeId
        name
        picture {
          localUrl
          url
          name
          type
          blob
        }
      }
      createdAt
      timer {
        start
        end
      }
      showInCaseOfSuccess
      audience {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          contest
          usersFound
          aboutThePersonality
          aboutTheOccupations
          createdAt
        }
        nextToken
      }
      participants {
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
          contest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          createdAt
          engageData
          likesToParticipants {
            nextToken
          }
          commentsToParticipants {
            nextToken
          }
          shareParticipants {
            nextToken
          }
          viewsParticipants {
            nextToken
          }
        }
        nextToken
      }
      usersSharing {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        nextToken
      }
      usersLikes {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserLike
          createdAt
          avatar
        }
        nextToken
      }
      viewsVideo {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserView
          createdAt
          avatar
          uri
          didJustFinish
          durationMillis
          positionMillis
          isPaused
          engageData
        }
        nextToken
      }
    }
    id
    name
    idUserView
    createdAt
    avatar
    uri
    didJustFinish
    durationMillis
    positionMillis
    isPaused
    engageData
  }
}
`;
export const listViewsVideos = `query ListViewsVideos(
  $filter: ModelViewsVideoFilterInput
  $limit: Int
  $nextToken: String
) {
  listViewsVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createContest {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheUser {
          companyName
          location {
            city
            country
            state
            street
          }
          titleInTheCompany
        }
        category
        general {
          description
          instructions
          nameOfContest
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        prizes {
          description
          prizeId
          name
          picture {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        timer {
          start
          end
        }
        showInCaseOfSuccess
        audience {
          items {
            id
            contest
            usersFound
            aboutThePersonality
            aboutTheOccupations
            createdAt
          }
          nextToken
        }
        participants {
          items {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          nextToken
        }
        usersSharing {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          nextToken
        }
        usersLikes {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        viewsVideo {
          items {
            id
            name
            idUserView
            createdAt
            avatar
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            engageData
          }
          nextToken
        }
      }
      id
      name
      idUserView
      createdAt
      avatar
      uri
      didJustFinish
      durationMillis
      positionMillis
      isPaused
      engageData
    }
    nextToken
  }
}
`;
export const getUsersSharing = `query GetUsersSharing($id: ID!) {
  getUsersSharing(id: $id) {
    createContest {
      id
      user {
        tokenfb
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        createContest {
          items {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          nextToken
        }
        submitPrize {
          items {
            id
            category
            createdAt
          }
          nextToken
        }
        engage {
          items {
            expoPushToken
            JSONdata
            createdAt
          }
          nextToken
        }
        coins
        notificationToken
      }
      aboutTheUser {
        companyName
        location {
          city
          country
          state
          street
        }
        titleInTheCompany
      }
      category
      general {
        description
        instructions
        nameOfContest
        picture {
          localUrl
          url
          name
          type
          blob
        }
        video {
          localUrl
          url
          name
          type
          blob
        }
      }
      prizes {
        description
        prizeId
        name
        picture {
          localUrl
          url
          name
          type
          blob
        }
      }
      createdAt
      timer {
        start
        end
      }
      showInCaseOfSuccess
      audience {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          contest
          usersFound
          aboutThePersonality
          aboutTheOccupations
          createdAt
        }
        nextToken
      }
      participants {
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
          contest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          createdAt
          engageData
          likesToParticipants {
            nextToken
          }
          commentsToParticipants {
            nextToken
          }
          shareParticipants {
            nextToken
          }
          viewsParticipants {
            nextToken
          }
        }
        nextToken
      }
      usersSharing {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        nextToken
      }
      usersLikes {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserLike
          createdAt
          avatar
        }
        nextToken
      }
      viewsVideo {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserView
          createdAt
          avatar
          uri
          didJustFinish
          durationMillis
          positionMillis
          isPaused
          engageData
        }
        nextToken
      }
    }
    id
    name
    idUserSharing
    whereItHasBeenShared
    createdAt
    avatar
  }
}
`;
export const listUsersSharings = `query ListUsersSharings(
  $filter: ModelUsersSharingFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsersSharings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createContest {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheUser {
          companyName
          location {
            city
            country
            state
            street
          }
          titleInTheCompany
        }
        category
        general {
          description
          instructions
          nameOfContest
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        prizes {
          description
          prizeId
          name
          picture {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        timer {
          start
          end
        }
        showInCaseOfSuccess
        audience {
          items {
            id
            contest
            usersFound
            aboutThePersonality
            aboutTheOccupations
            createdAt
          }
          nextToken
        }
        participants {
          items {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          nextToken
        }
        usersSharing {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          nextToken
        }
        usersLikes {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        viewsVideo {
          items {
            id
            name
            idUserView
            createdAt
            avatar
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            engageData
          }
          nextToken
        }
      }
      id
      name
      idUserSharing
      whereItHasBeenShared
      createdAt
      avatar
    }
    nextToken
  }
}
`;
export const getUsersLikes = `query GetUsersLikes($id: ID!) {
  getUsersLikes(id: $id) {
    createContest {
      id
      user {
        tokenfb
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        createContest {
          items {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          nextToken
        }
        submitPrize {
          items {
            id
            category
            createdAt
          }
          nextToken
        }
        engage {
          items {
            expoPushToken
            JSONdata
            createdAt
          }
          nextToken
        }
        coins
        notificationToken
      }
      aboutTheUser {
        companyName
        location {
          city
          country
          state
          street
        }
        titleInTheCompany
      }
      category
      general {
        description
        instructions
        nameOfContest
        picture {
          localUrl
          url
          name
          type
          blob
        }
        video {
          localUrl
          url
          name
          type
          blob
        }
      }
      prizes {
        description
        prizeId
        name
        picture {
          localUrl
          url
          name
          type
          blob
        }
      }
      createdAt
      timer {
        start
        end
      }
      showInCaseOfSuccess
      audience {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          contest
          usersFound
          aboutThePersonality
          aboutTheOccupations
          createdAt
        }
        nextToken
      }
      participants {
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
          contest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          createdAt
          engageData
          likesToParticipants {
            nextToken
          }
          commentsToParticipants {
            nextToken
          }
          shareParticipants {
            nextToken
          }
          viewsParticipants {
            nextToken
          }
        }
        nextToken
      }
      usersSharing {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        nextToken
      }
      usersLikes {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserLike
          createdAt
          avatar
        }
        nextToken
      }
      viewsVideo {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserView
          createdAt
          avatar
          uri
          didJustFinish
          durationMillis
          positionMillis
          isPaused
          engageData
        }
        nextToken
      }
    }
    id
    name
    idUserLike
    createdAt
    avatar
  }
}
`;
export const listUsersLikess = `query ListUsersLikess(
  $filter: ModelUsersLikesFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsersLikess(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createContest {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheUser {
          companyName
          location {
            city
            country
            state
            street
          }
          titleInTheCompany
        }
        category
        general {
          description
          instructions
          nameOfContest
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        prizes {
          description
          prizeId
          name
          picture {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        timer {
          start
          end
        }
        showInCaseOfSuccess
        audience {
          items {
            id
            contest
            usersFound
            aboutThePersonality
            aboutTheOccupations
            createdAt
          }
          nextToken
        }
        participants {
          items {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          nextToken
        }
        usersSharing {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          nextToken
        }
        usersLikes {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        viewsVideo {
          items {
            id
            name
            idUserView
            createdAt
            avatar
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            engageData
          }
          nextToken
        }
      }
      id
      name
      idUserLike
      createdAt
      avatar
    }
    nextToken
  }
}
`;
export const getAudience = `query GetAudience($id: ID!) {
  getAudience(id: $id) {
    createContest {
      id
      user {
        tokenfb
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        createContest {
          items {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          nextToken
        }
        submitPrize {
          items {
            id
            category
            createdAt
          }
          nextToken
        }
        engage {
          items {
            expoPushToken
            JSONdata
            createdAt
          }
          nextToken
        }
        coins
        notificationToken
      }
      aboutTheUser {
        companyName
        location {
          city
          country
          state
          street
        }
        titleInTheCompany
      }
      category
      general {
        description
        instructions
        nameOfContest
        picture {
          localUrl
          url
          name
          type
          blob
        }
        video {
          localUrl
          url
          name
          type
          blob
        }
      }
      prizes {
        description
        prizeId
        name
        picture {
          localUrl
          url
          name
          type
          blob
        }
      }
      createdAt
      timer {
        start
        end
      }
      showInCaseOfSuccess
      audience {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          contest
          usersFound
          aboutThePersonality
          aboutTheOccupations
          createdAt
        }
        nextToken
      }
      participants {
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
          contest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          createdAt
          engageData
          likesToParticipants {
            nextToken
          }
          commentsToParticipants {
            nextToken
          }
          shareParticipants {
            nextToken
          }
          viewsParticipants {
            nextToken
          }
        }
        nextToken
      }
      usersSharing {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        nextToken
      }
      usersLikes {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserLike
          createdAt
          avatar
        }
        nextToken
      }
      viewsVideo {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserView
          createdAt
          avatar
          uri
          didJustFinish
          durationMillis
          positionMillis
          isPaused
          engageData
        }
        nextToken
      }
    }
    id
    contest
    usersFound
    aboutThePersonality
    aboutTheOccupations
    createdAt
  }
}
`;
export const listAudiences = `query ListAudiences(
  $filter: ModelAudienceFilterInput
  $limit: Int
  $nextToken: String
) {
  listAudiences(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createContest {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheUser {
          companyName
          location {
            city
            country
            state
            street
          }
          titleInTheCompany
        }
        category
        general {
          description
          instructions
          nameOfContest
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        prizes {
          description
          prizeId
          name
          picture {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        timer {
          start
          end
        }
        showInCaseOfSuccess
        audience {
          items {
            id
            contest
            usersFound
            aboutThePersonality
            aboutTheOccupations
            createdAt
          }
          nextToken
        }
        participants {
          items {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          nextToken
        }
        usersSharing {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          nextToken
        }
        usersLikes {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        viewsVideo {
          items {
            id
            name
            idUserView
            createdAt
            avatar
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            engageData
          }
          nextToken
        }
      }
      id
      contest
      usersFound
      aboutThePersonality
      aboutTheOccupations
      createdAt
    }
    nextToken
  }
}
`;
export const getParticipants = `query GetParticipants($id: ID!) {
  getParticipants(id: $id) {
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
    contest {
      id
      user {
        tokenfb
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        createContest {
          items {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          nextToken
        }
        submitPrize {
          items {
            id
            category
            createdAt
          }
          nextToken
        }
        engage {
          items {
            expoPushToken
            JSONdata
            createdAt
          }
          nextToken
        }
        coins
        notificationToken
      }
      aboutTheUser {
        companyName
        location {
          city
          country
          state
          street
        }
        titleInTheCompany
      }
      category
      general {
        description
        instructions
        nameOfContest
        picture {
          localUrl
          url
          name
          type
          blob
        }
        video {
          localUrl
          url
          name
          type
          blob
        }
      }
      prizes {
        description
        prizeId
        name
        picture {
          localUrl
          url
          name
          type
          blob
        }
      }
      createdAt
      timer {
        start
        end
      }
      showInCaseOfSuccess
      audience {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          contest
          usersFound
          aboutThePersonality
          aboutTheOccupations
          createdAt
        }
        nextToken
      }
      participants {
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
          contest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          createdAt
          engageData
          likesToParticipants {
            nextToken
          }
          commentsToParticipants {
            nextToken
          }
          shareParticipants {
            nextToken
          }
          viewsParticipants {
            nextToken
          }
        }
        nextToken
      }
      usersSharing {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        nextToken
      }
      usersLikes {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserLike
          createdAt
          avatar
        }
        nextToken
      }
      viewsVideo {
        items {
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          name
          idUserView
          createdAt
          avatar
          uri
          didJustFinish
          durationMillis
          positionMillis
          isPaused
          engageData
        }
        nextToken
      }
    }
    createdAt
    engageData
    likesToParticipants {
      items {
        participants {
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
          contest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          createdAt
          engageData
          likesToParticipants {
            nextToken
          }
          commentsToParticipants {
            nextToken
          }
          shareParticipants {
            nextToken
          }
          viewsParticipants {
            nextToken
          }
        }
        id
        name
        idUserLike
        createdAt
        avatar
        engageData
      }
      nextToken
    }
    commentsToParticipants {
      items {
        participants {
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
          contest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          createdAt
          engageData
          likesToParticipants {
            nextToken
          }
          commentsToParticipants {
            nextToken
          }
          shareParticipants {
            nextToken
          }
          viewsParticipants {
            nextToken
          }
        }
        id
        name
        idUserComments
        createdAt
        avatar
        comments
        edited
        engageData
      }
      nextToken
    }
    shareParticipants {
      items {
        participants {
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
          contest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          createdAt
          engageData
          likesToParticipants {
            nextToken
          }
          commentsToParticipants {
            nextToken
          }
          shareParticipants {
            nextToken
          }
          viewsParticipants {
            nextToken
          }
        }
        id
        name
        idUserSharing
        whereItHasBeenShared
        createdAt
        avatar
        engageData
      }
      nextToken
    }
    viewsParticipants {
      items {
        participants {
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
          contest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          createdAt
          engageData
          likesToParticipants {
            nextToken
          }
          commentsToParticipants {
            nextToken
          }
          shareParticipants {
            nextToken
          }
          viewsParticipants {
            nextToken
          }
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
        engageData
      }
      nextToken
    }
  }
}
`;
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
      contest {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheUser {
          companyName
          location {
            city
            country
            state
            street
          }
          titleInTheCompany
        }
        category
        general {
          description
          instructions
          nameOfContest
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        prizes {
          description
          prizeId
          name
          picture {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        timer {
          start
          end
        }
        showInCaseOfSuccess
        audience {
          items {
            id
            contest
            usersFound
            aboutThePersonality
            aboutTheOccupations
            createdAt
          }
          nextToken
        }
        participants {
          items {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          nextToken
        }
        usersSharing {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          nextToken
        }
        usersLikes {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        viewsVideo {
          items {
            id
            name
            idUserView
            createdAt
            avatar
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            engageData
          }
          nextToken
        }
      }
      createdAt
      engageData
      likesToParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserLike
          createdAt
          avatar
          engageData
        }
        nextToken
      }
      commentsToParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
          engageData
        }
        nextToken
      }
      shareParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
          engageData
        }
        nextToken
      }
      viewsParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
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
          engageData
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getViewsParticipants = `query GetViewsParticipants($id: ID!) {
  getViewsParticipants(id: $id) {
    participants {
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
      contest {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheUser {
          companyName
          location {
            city
            country
            state
            street
          }
          titleInTheCompany
        }
        category
        general {
          description
          instructions
          nameOfContest
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        prizes {
          description
          prizeId
          name
          picture {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        timer {
          start
          end
        }
        showInCaseOfSuccess
        audience {
          items {
            id
            contest
            usersFound
            aboutThePersonality
            aboutTheOccupations
            createdAt
          }
          nextToken
        }
        participants {
          items {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          nextToken
        }
        usersSharing {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          nextToken
        }
        usersLikes {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        viewsVideo {
          items {
            id
            name
            idUserView
            createdAt
            avatar
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            engageData
          }
          nextToken
        }
      }
      createdAt
      engageData
      likesToParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserLike
          createdAt
          avatar
          engageData
        }
        nextToken
      }
      commentsToParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
          engageData
        }
        nextToken
      }
      shareParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
          engageData
        }
        nextToken
      }
      viewsParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
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
          engageData
        }
        nextToken
      }
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
    engageData
  }
}
`;
export const listViewsParticipantss = `query ListViewsParticipantss(
  $filter: ModelViewsParticipantsFilterInput
  $limit: Int
  $nextToken: String
) {
  listViewsParticipantss(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      participants {
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
        contest {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        createdAt
        engageData
        likesToParticipants {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
            engageData
          }
          nextToken
        }
        commentsToParticipants {
          items {
            id
            name
            idUserComments
            createdAt
            avatar
            comments
            edited
            engageData
          }
          nextToken
        }
        shareParticipants {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
            engageData
          }
          nextToken
        }
        viewsParticipants {
          items {
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
            engageData
          }
          nextToken
        }
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
      engageData
    }
    nextToken
  }
}
`;
export const getShareParticipants = `query GetShareParticipants($id: ID!) {
  getShareParticipants(id: $id) {
    participants {
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
      contest {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheUser {
          companyName
          location {
            city
            country
            state
            street
          }
          titleInTheCompany
        }
        category
        general {
          description
          instructions
          nameOfContest
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        prizes {
          description
          prizeId
          name
          picture {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        timer {
          start
          end
        }
        showInCaseOfSuccess
        audience {
          items {
            id
            contest
            usersFound
            aboutThePersonality
            aboutTheOccupations
            createdAt
          }
          nextToken
        }
        participants {
          items {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          nextToken
        }
        usersSharing {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          nextToken
        }
        usersLikes {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        viewsVideo {
          items {
            id
            name
            idUserView
            createdAt
            avatar
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            engageData
          }
          nextToken
        }
      }
      createdAt
      engageData
      likesToParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserLike
          createdAt
          avatar
          engageData
        }
        nextToken
      }
      commentsToParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
          engageData
        }
        nextToken
      }
      shareParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
          engageData
        }
        nextToken
      }
      viewsParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
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
          engageData
        }
        nextToken
      }
    }
    id
    name
    idUserSharing
    whereItHasBeenShared
    createdAt
    avatar
    engageData
  }
}
`;
export const listShareParticipantss = `query ListShareParticipantss(
  $filter: ModelShareParticipantsFilterInput
  $limit: Int
  $nextToken: String
) {
  listShareParticipantss(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      participants {
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
        contest {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        createdAt
        engageData
        likesToParticipants {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
            engageData
          }
          nextToken
        }
        commentsToParticipants {
          items {
            id
            name
            idUserComments
            createdAt
            avatar
            comments
            edited
            engageData
          }
          nextToken
        }
        shareParticipants {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
            engageData
          }
          nextToken
        }
        viewsParticipants {
          items {
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
            engageData
          }
          nextToken
        }
      }
      id
      name
      idUserSharing
      whereItHasBeenShared
      createdAt
      avatar
      engageData
    }
    nextToken
  }
}
`;
export const getLikesToParticipants = `query GetLikesToParticipants($id: ID!) {
  getLikesToParticipants(id: $id) {
    participants {
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
      contest {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheUser {
          companyName
          location {
            city
            country
            state
            street
          }
          titleInTheCompany
        }
        category
        general {
          description
          instructions
          nameOfContest
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        prizes {
          description
          prizeId
          name
          picture {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        timer {
          start
          end
        }
        showInCaseOfSuccess
        audience {
          items {
            id
            contest
            usersFound
            aboutThePersonality
            aboutTheOccupations
            createdAt
          }
          nextToken
        }
        participants {
          items {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          nextToken
        }
        usersSharing {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          nextToken
        }
        usersLikes {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        viewsVideo {
          items {
            id
            name
            idUserView
            createdAt
            avatar
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            engageData
          }
          nextToken
        }
      }
      createdAt
      engageData
      likesToParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserLike
          createdAt
          avatar
          engageData
        }
        nextToken
      }
      commentsToParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
          engageData
        }
        nextToken
      }
      shareParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
          engageData
        }
        nextToken
      }
      viewsParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
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
          engageData
        }
        nextToken
      }
    }
    id
    name
    idUserLike
    createdAt
    avatar
    engageData
  }
}
`;
export const listLikesToParticipantss = `query ListLikesToParticipantss(
  $filter: ModelLikesToParticipantsFilterInput
  $limit: Int
  $nextToken: String
) {
  listLikesToParticipantss(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      participants {
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
        contest {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        createdAt
        engageData
        likesToParticipants {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
            engageData
          }
          nextToken
        }
        commentsToParticipants {
          items {
            id
            name
            idUserComments
            createdAt
            avatar
            comments
            edited
            engageData
          }
          nextToken
        }
        shareParticipants {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
            engageData
          }
          nextToken
        }
        viewsParticipants {
          items {
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
            engageData
          }
          nextToken
        }
      }
      id
      name
      idUserLike
      createdAt
      avatar
      engageData
    }
    nextToken
  }
}
`;
export const getCommentsToParticipants = `query GetCommentsToParticipants($id: ID!) {
  getCommentsToParticipants(id: $id) {
    participants {
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
      contest {
        id
        user {
          tokenfb
          id
          userId
          name
          username
          lastname
          email
          avatar
          phone
          datetime
          scope
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
          coins
          notificationToken
        }
        aboutTheUser {
          companyName
          location {
            city
            country
            state
            street
          }
          titleInTheCompany
        }
        category
        general {
          description
          instructions
          nameOfContest
          picture {
            localUrl
            url
            name
            type
            blob
          }
          video {
            localUrl
            url
            name
            type
            blob
          }
        }
        prizes {
          description
          prizeId
          name
          picture {
            localUrl
            url
            name
            type
            blob
          }
        }
        createdAt
        timer {
          start
          end
        }
        showInCaseOfSuccess
        audience {
          items {
            id
            contest
            usersFound
            aboutThePersonality
            aboutTheOccupations
            createdAt
          }
          nextToken
        }
        participants {
          items {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          nextToken
        }
        usersSharing {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          nextToken
        }
        usersLikes {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
          }
          nextToken
        }
        viewsVideo {
          items {
            id
            name
            idUserView
            createdAt
            avatar
            uri
            didJustFinish
            durationMillis
            positionMillis
            isPaused
            engageData
          }
          nextToken
        }
      }
      createdAt
      engageData
      likesToParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserLike
          createdAt
          avatar
          engageData
        }
        nextToken
      }
      commentsToParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
          engageData
        }
        nextToken
      }
      shareParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
          }
          id
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
          engageData
        }
        nextToken
      }
      viewsParticipants {
        items {
          participants {
            contestId
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
            engageData
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
          engageData
        }
        nextToken
      }
    }
    id
    name
    idUserComments
    createdAt
    avatar
    comments
    edited
    engageData
  }
}
`;
export const listCommentsToParticipantss = `query ListCommentsToParticipantss(
  $filter: ModelCommentsToParticipantsFilterInput
  $limit: Int
  $nextToken: String
) {
  listCommentsToParticipantss(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      participants {
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
        contest {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        createdAt
        engageData
        likesToParticipants {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
            engageData
          }
          nextToken
        }
        commentsToParticipants {
          items {
            id
            name
            idUserComments
            createdAt
            avatar
            comments
            edited
            engageData
          }
          nextToken
        }
        shareParticipants {
          items {
            id
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
            engageData
          }
          nextToken
        }
        viewsParticipants {
          items {
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
            engageData
          }
          nextToken
        }
      }
      id
      name
      idUserComments
      createdAt
      avatar
      comments
      edited
      engageData
    }
    nextToken
  }
}
`;
export const getContestCategory = `query GetContestCategory($id: ID!) {
  getContestCategory(id: $id) {
    id
    name
    picture
    category
  }
}
`;
export const listContestCategorys = `query ListContestCategorys(
  $filter: ModelContestCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listContestCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      picture
      category
    }
    nextToken
  }
}
`;
export const getPrizesCategory = `query GetPrizesCategory($id: ID!) {
  getPrizesCategory(id: $id) {
    id
    name
    picture
    category
  }
}
`;
export const listPrizesCategorys = `query ListPrizesCategorys(
  $filter: ModelPrizesCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listPrizesCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      picture
      category
    }
    nextToken
  }
}
`;
export const getSubmitPrize = `query GetSubmitPrize($id: ID!) {
  getSubmitPrize(id: $id) {
    id
    user {
      tokenfb
      id
      userId
      name
      username
      lastname
      email
      avatar
      phone
      datetime
      scope
      createContest {
        items {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        nextToken
      }
      submitPrize {
        items {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheCompany {
            companyName
            generalInformation
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          share {
            contentUserShare
            footerContent
            socialMediaHandle
            whatUserDo
          }
        }
        nextToken
      }
      engage {
        items {
          expoPushToken
          JSONdata
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutThePersonality {
            age
            amountOfChildren
            amountOfSimblings
            birthDate
            gender
            maritalStatus
            nacionality
            parentalCondition
            regionalIdentity
            sexuality
          }
          aboutTheOccupations {
            levelAchivied
            occupation
            rentOrOwnCar
            rentOrOwnHouse
            schools
            university
            socioeconomicLevel
            political
          }
          createdAt
        }
        nextToken
      }
      coins
      notificationToken
    }
    aboutTheCompany {
      businessLocation {
        city
        country
        state
        street
      }
      companyName
      generalInformation
    }
    category
    general {
      price
      nameOfPrize
      description
      picture {
        localUrl
        url
        name
        type
        blob
      }
      video {
        localUrl
        url
        name
        type
        blob
      }
    }
    createdAt
    share {
      contentUserShare
      footerContent
      socialMediaHandle
      whatUserDo
    }
  }
}
`;
export const listSubmitPrizes = `query ListSubmitPrizes(
  $filter: ModelSubmitPrizeFilterInput
  $limit: Int
  $nextToken: String
) {
  listSubmitPrizes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        tokenfb
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        createContest {
          items {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          nextToken
        }
        submitPrize {
          items {
            id
            category
            createdAt
          }
          nextToken
        }
        engage {
          items {
            expoPushToken
            JSONdata
            createdAt
          }
          nextToken
        }
        coins
        notificationToken
      }
      aboutTheCompany {
        businessLocation {
          city
          country
          state
          street
        }
        companyName
        generalInformation
      }
      category
      general {
        price
        nameOfPrize
        description
        picture {
          localUrl
          url
          name
          type
          blob
        }
        video {
          localUrl
          url
          name
          type
          blob
        }
      }
      createdAt
      share {
        contentUserShare
        footerContent
        socialMediaHandle
        whatUserDo
      }
    }
    nextToken
  }
}
`;
export const getEngage = `query GetEngage($id: ID!) {
  getEngage(id: $id) {
    expoPushToken
    JSONdata
    user {
      tokenfb
      id
      userId
      name
      username
      lastname
      email
      avatar
      phone
      datetime
      scope
      createContest {
        items {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheUser {
            companyName
            titleInTheCompany
          }
          category
          general {
            description
            instructions
            nameOfContest
          }
          prizes {
            description
            prizeId
            name
          }
          createdAt
          timer {
            start
            end
          }
          showInCaseOfSuccess
          audience {
            nextToken
          }
          participants {
            nextToken
          }
          usersSharing {
            nextToken
          }
          usersLikes {
            nextToken
          }
          viewsVideo {
            nextToken
          }
        }
        nextToken
      }
      submitPrize {
        items {
          id
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutTheCompany {
            companyName
            generalInformation
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          share {
            contentUserShare
            footerContent
            socialMediaHandle
            whatUserDo
          }
        }
        nextToken
      }
      engage {
        items {
          expoPushToken
          JSONdata
          user {
            tokenfb
            id
            userId
            name
            username
            lastname
            email
            avatar
            phone
            datetime
            scope
            coins
            notificationToken
          }
          aboutThePersonality {
            age
            amountOfChildren
            amountOfSimblings
            birthDate
            gender
            maritalStatus
            nacionality
            parentalCondition
            regionalIdentity
            sexuality
          }
          aboutTheOccupations {
            levelAchivied
            occupation
            rentOrOwnCar
            rentOrOwnHouse
            schools
            university
            socioeconomicLevel
            political
          }
          createdAt
        }
        nextToken
      }
      coins
      notificationToken
    }
    aboutThePersonality {
      age
      amountOfChildren
      amountOfSimblings
      birthDate
      gender
      location {
        city
        country
        state
        street
      }
      maritalStatus
      nacionality
      parentalCondition
      regionalIdentity
      sexuality
    }
    aboutTheOccupations {
      levelAchivied
      occupation
      rentOrOwnCar
      rentOrOwnHouse
      schools
      university
      socioeconomicLevel
      political
    }
    createdAt
  }
}
`;
export const listEngages = `query ListEngages(
  $filter: ModelEngageFilterInput
  $limit: Int
  $nextToken: String
) {
  listEngages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      expoPushToken
      JSONdata
      user {
        tokenfb
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        createContest {
          items {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          nextToken
        }
        submitPrize {
          items {
            id
            category
            createdAt
          }
          nextToken
        }
        engage {
          items {
            expoPushToken
            JSONdata
            createdAt
          }
          nextToken
        }
        coins
        notificationToken
      }
      aboutThePersonality {
        age
        amountOfChildren
        amountOfSimblings
        birthDate
        gender
        location {
          city
          country
          state
          street
        }
        maritalStatus
        nacionality
        parentalCondition
        regionalIdentity
        sexuality
      }
      aboutTheOccupations {
        levelAchivied
        occupation
        rentOrOwnCar
        rentOrOwnHouse
        schools
        university
        socioeconomicLevel
        political
      }
      createdAt
    }
    nextToken
  }
}
`;
export const getNotifications = `query GetNotifications($id: ID!) {
  getNotifications(id: $id) {
    id
    nameOfcontest
    idUSerFrom
    idUserTo
    userFrom
    userTo
    expoPushToken
    messageTitle
    messageBody
    JSONdata
    createdAt
    expirationDateWeek
    avatar
  }
}
`;
export const listNotificationss = `query ListNotificationss(
  $filter: ModelNotificationsFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotificationss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      nameOfcontest
      idUSerFrom
      idUserTo
      userFrom
      userTo
      expoPushToken
      messageTitle
      messageBody
      JSONdata
      createdAt
      expirationDateWeek
      avatar
    }
    nextToken
  }
}
`;
