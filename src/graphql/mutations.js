// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          vote
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          vote
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          vote
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
export const createCreateContest = `mutation CreateCreateContest($input: CreateCreateContestInput!) {
  createCreateContest(input: $input) {
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
            vote
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
        JSONdata
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
        genders
        ages
        categoryContest
        countries
        nacionalities
        regionalIdentity
        sexualities
        maritalStatus
        academicLevelAchieved
        schools
        universities
        musicalGenre
        sports
        parentalCondition
        amountOfChildren
        amountOfSimblings
        politicalPeople
        peopleWhoVote
        occupation
        socioeconomicLevel
        rentOrOwnHouse
        rentOrOwnCar
        categoryPrizes
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
        likesToParticipants {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
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
      }
      nextToken
    }
  }
}
`;
export const updateCreateContest = `mutation UpdateCreateContest($input: UpdateCreateContestInput!) {
  updateCreateContest(input: $input) {
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
            vote
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
        JSONdata
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
        genders
        ages
        categoryContest
        countries
        nacionalities
        regionalIdentity
        sexualities
        maritalStatus
        academicLevelAchieved
        schools
        universities
        musicalGenre
        sports
        parentalCondition
        amountOfChildren
        amountOfSimblings
        politicalPeople
        peopleWhoVote
        occupation
        socioeconomicLevel
        rentOrOwnHouse
        rentOrOwnCar
        categoryPrizes
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
        likesToParticipants {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
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
      }
      nextToken
    }
  }
}
`;
export const deleteCreateContest = `mutation DeleteCreateContest($input: DeleteCreateContestInput!) {
  deleteCreateContest(input: $input) {
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
            vote
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
        JSONdata
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
        genders
        ages
        categoryContest
        countries
        nacionalities
        regionalIdentity
        sexualities
        maritalStatus
        academicLevelAchieved
        schools
        universities
        musicalGenre
        sports
        parentalCondition
        amountOfChildren
        amountOfSimblings
        politicalPeople
        peopleWhoVote
        occupation
        socioeconomicLevel
        rentOrOwnHouse
        rentOrOwnCar
        categoryPrizes
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
        likesToParticipants {
          items {
            id
            name
            idUserLike
            createdAt
            avatar
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
      }
      nextToken
    }
  }
}
`;
export const createViewsVideo = `mutation CreateViewsVideo($input: CreateViewsVideoInput!) {
  createViewsVideo(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
  }
}
`;
export const updateViewsVideo = `mutation UpdateViewsVideo($input: UpdateViewsVideoInput!) {
  updateViewsVideo(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
  }
}
`;
export const deleteViewsVideo = `mutation DeleteViewsVideo($input: DeleteViewsVideoInput!) {
  deleteViewsVideo(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
  }
}
`;
export const createUsersSharing = `mutation CreateUsersSharing($input: CreateUsersSharingInput!) {
  createUsersSharing(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
export const updateUsersSharing = `mutation UpdateUsersSharing($input: UpdateUsersSharingInput!) {
  updateUsersSharing(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
export const deleteUsersSharing = `mutation DeleteUsersSharing($input: DeleteUsersSharingInput!) {
  deleteUsersSharing(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
export const createUsersLikes = `mutation CreateUsersLikes($input: CreateUsersLikesInput!) {
  createUsersLikes(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
export const updateUsersLikes = `mutation UpdateUsersLikes($input: UpdateUsersLikesInput!) {
  updateUsersLikes(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
export const deleteUsersLikes = `mutation DeleteUsersLikes($input: DeleteUsersLikesInput!) {
  deleteUsersLikes(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
export const createAudience = `mutation CreateAudience($input: CreateAudienceInput!) {
  createAudience(input: $input) {
    JSONdata
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
        }
        nextToken
      }
    }
    id
    genders
    ages
    categoryContest
    countries
    nacionalities
    regionalIdentity
    sexualities
    maritalStatus
    academicLevelAchieved
    schools
    universities
    musicalGenre
    sports
    parentalCondition
    amountOfChildren
    amountOfSimblings
    politicalPeople
    peopleWhoVote
    occupation
    socioeconomicLevel
    rentOrOwnHouse
    rentOrOwnCar
    categoryPrizes
    createdAt
  }
}
`;
export const updateAudience = `mutation UpdateAudience($input: UpdateAudienceInput!) {
  updateAudience(input: $input) {
    JSONdata
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
        }
        nextToken
      }
    }
    id
    genders
    ages
    categoryContest
    countries
    nacionalities
    regionalIdentity
    sexualities
    maritalStatus
    academicLevelAchieved
    schools
    universities
    musicalGenre
    sports
    parentalCondition
    amountOfChildren
    amountOfSimblings
    politicalPeople
    peopleWhoVote
    occupation
    socioeconomicLevel
    rentOrOwnHouse
    rentOrOwnCar
    categoryPrizes
    createdAt
  }
}
`;
export const deleteAudience = `mutation DeleteAudience($input: DeleteAudienceInput!) {
  deleteAudience(input: $input) {
    JSONdata
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
        }
        nextToken
      }
    }
    id
    genders
    ages
    categoryContest
    countries
    nacionalities
    regionalIdentity
    sexualities
    maritalStatus
    academicLevelAchieved
    schools
    universities
    musicalGenre
    sports
    parentalCondition
    amountOfChildren
    amountOfSimblings
    politicalPeople
    peopleWhoVote
    occupation
    socioeconomicLevel
    rentOrOwnHouse
    rentOrOwnCar
    categoryPrizes
    createdAt
  }
}
`;
export const createParticipants = `mutation CreateParticipants($input: CreateParticipantsInput!) {
  createParticipants(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
        }
        nextToken
      }
    }
    createdAt
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
      }
      nextToken
    }
  }
}
`;
export const updateParticipants = `mutation UpdateParticipants($input: UpdateParticipantsInput!) {
  updateParticipants(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
        }
        nextToken
      }
    }
    createdAt
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
      }
      nextToken
    }
  }
}
`;
export const deleteParticipants = `mutation DeleteParticipants($input: DeleteParticipantsInput!) {
  deleteParticipants(input: $input) {
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
          JSONdata
          createContest {
            id
            category
            createdAt
            showInCaseOfSuccess
          }
          id
          genders
          ages
          categoryContest
          countries
          nacionalities
          regionalIdentity
          sexualities
          maritalStatus
          academicLevelAchieved
          schools
          universities
          musicalGenre
          sports
          parentalCondition
          amountOfChildren
          amountOfSimblings
          politicalPeople
          peopleWhoVote
          occupation
          socioeconomicLevel
          rentOrOwnHouse
          rentOrOwnCar
          categoryPrizes
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
        }
        nextToken
      }
    }
    createdAt
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
      }
      nextToken
    }
  }
}
`;
export const createViewsParticipants = `mutation CreateViewsParticipants($input: CreateViewsParticipantsInput!) {
  createViewsParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
  }
}
`;
export const updateViewsParticipants = `mutation UpdateViewsParticipants($input: UpdateViewsParticipantsInput!) {
  updateViewsParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
  }
}
`;
export const deleteViewsParticipants = `mutation DeleteViewsParticipants($input: DeleteViewsParticipantsInput!) {
  deleteViewsParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
  }
}
`;
export const createShareParticipants = `mutation CreateShareParticipants($input: CreateShareParticipantsInput!) {
  createShareParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
export const updateShareParticipants = `mutation UpdateShareParticipants($input: UpdateShareParticipantsInput!) {
  updateShareParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
export const deleteShareParticipants = `mutation DeleteShareParticipants($input: DeleteShareParticipantsInput!) {
  deleteShareParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
export const createLikesToParticipants = `mutation CreateLikesToParticipants($input: CreateLikesToParticipantsInput!) {
  createLikesToParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
export const updateLikesToParticipants = `mutation UpdateLikesToParticipants($input: UpdateLikesToParticipantsInput!) {
  updateLikesToParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
export const deleteLikesToParticipants = `mutation DeleteLikesToParticipants($input: DeleteLikesToParticipantsInput!) {
  deleteLikesToParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
export const createCommentsToParticipants = `mutation CreateCommentsToParticipants(
  $input: CreateCommentsToParticipantsInput!
) {
  createCommentsToParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
  }
}
`;
export const updateCommentsToParticipants = `mutation UpdateCommentsToParticipants(
  $input: UpdateCommentsToParticipantsInput!
) {
  updateCommentsToParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
  }
}
`;
export const deleteCommentsToParticipants = `mutation DeleteCommentsToParticipants(
  $input: DeleteCommentsToParticipantsInput!
) {
  deleteCommentsToParticipants(input: $input) {
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
            JSONdata
            id
            genders
            ages
            categoryContest
            countries
            nacionalities
            regionalIdentity
            sexualities
            maritalStatus
            academicLevelAchieved
            schools
            universities
            musicalGenre
            sports
            parentalCondition
            amountOfChildren
            amountOfSimblings
            politicalPeople
            peopleWhoVote
            occupation
            socioeconomicLevel
            rentOrOwnHouse
            rentOrOwnCar
            categoryPrizes
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
          }
          nextToken
        }
      }
      createdAt
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
          }
          id
          name
          idUserLike
          createdAt
          avatar
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
          }
          id
          name
          idUserComments
          createdAt
          avatar
          comments
          edited
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
  }
}
`;
export const createContestCategory = `mutation CreateContestCategory($input: CreateContestCategoryInput!) {
  createContestCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const updateContestCategory = `mutation UpdateContestCategory($input: UpdateContestCategoryInput!) {
  updateContestCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const deleteContestCategory = `mutation DeleteContestCategory($input: DeleteContestCategoryInput!) {
  deleteContestCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const createPrizesCategory = `mutation CreatePrizesCategory($input: CreatePrizesCategoryInput!) {
  createPrizesCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const updatePrizesCategory = `mutation UpdatePrizesCategory($input: UpdatePrizesCategoryInput!) {
  updatePrizesCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const deletePrizesCategory = `mutation DeletePrizesCategory($input: DeletePrizesCategoryInput!) {
  deletePrizesCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const createSubmitPrize = `mutation CreateSubmitPrize($input: CreateSubmitPrizeInput!) {
  createSubmitPrize(input: $input) {
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
            vote
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
export const updateSubmitPrize = `mutation UpdateSubmitPrize($input: UpdateSubmitPrizeInput!) {
  updateSubmitPrize(input: $input) {
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
            vote
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
export const deleteSubmitPrize = `mutation DeleteSubmitPrize($input: DeleteSubmitPrizeInput!) {
  deleteSubmitPrize(input: $input) {
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
            vote
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
export const createEngage = `mutation CreateEngage($input: CreateEngageInput!) {
  createEngage(input: $input) {
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
            vote
          }
          createdAt
        }
        nextToken
      }
      coins
      notificationToken
    }
    aboutThePersonality {
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
      vote
    }
    createdAt
  }
}
`;
export const updateEngage = `mutation UpdateEngage($input: UpdateEngageInput!) {
  updateEngage(input: $input) {
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
            vote
          }
          createdAt
        }
        nextToken
      }
      coins
      notificationToken
    }
    aboutThePersonality {
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
      vote
    }
    createdAt
  }
}
`;
export const deleteEngage = `mutation DeleteEngage($input: DeleteEngageInput!) {
  deleteEngage(input: $input) {
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
            vote
          }
          createdAt
        }
        nextToken
      }
      coins
      notificationToken
    }
    aboutThePersonality {
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
      vote
    }
    createdAt
  }
}
`;
export const createNotifications = `mutation CreateNotifications($input: CreateNotificationsInput!) {
  createNotifications(input: $input) {
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
export const updateNotifications = `mutation UpdateNotifications($input: UpdateNotificationsInput!) {
  updateNotifications(input: $input) {
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
export const deleteNotifications = `mutation DeleteNotifications($input: DeleteNotificationsInput!) {
  deleteNotifications(input: $input) {
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
