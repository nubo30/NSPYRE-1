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
          video {
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
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
          }
          nextToken
        }
        statistics {
          userSharing {
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          userLikes {
            name
            idUserLike
            createdAt
            avatar
          }
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
          socialMediaHandle {
            facebook
            twitter
            instagram
            snapchat
          }
        }
        category
        general {
          price
          nameOfPrize
          description
          instructions {
            msg
            typeContentInstructionsValue
          }
          socialMediaHandle {
            facebook
            twitter
            instagram
            snapchat
          }
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
        delivery {
          description
          socialMediaSelected
          typeOfSocialNetwork
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
        }
        interests {
          categoryContest
          categoryPrize
          musicalGenre
          sports
          political
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
          video {
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
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
          }
          nextToken
        }
        statistics {
          userSharing {
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          userLikes {
            name
            idUserLike
            createdAt
            avatar
          }
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
          socialMediaHandle {
            facebook
            twitter
            instagram
            snapchat
          }
        }
        category
        general {
          price
          nameOfPrize
          description
          instructions {
            msg
            typeContentInstructionsValue
          }
          socialMediaHandle {
            facebook
            twitter
            instagram
            snapchat
          }
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
        delivery {
          description
          socialMediaSelected
          typeOfSocialNetwork
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
        }
        interests {
          categoryContest
          categoryPrize
          musicalGenre
          sports
          political
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
          video {
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
            id
            participantId
            nameUser
            comment
            avatar
            createdAt
          }
          nextToken
        }
        statistics {
          userSharing {
            name
            idUserSharing
            whereItHasBeenShared
            createdAt
            avatar
          }
          userLikes {
            name
            idUserLike
            createdAt
            avatar
          }
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
          socialMediaHandle {
            facebook
            twitter
            instagram
            snapchat
          }
        }
        category
        general {
          price
          nameOfPrize
          description
          instructions {
            msg
            typeContentInstructionsValue
          }
          socialMediaHandle {
            facebook
            twitter
            instagram
            snapchat
          }
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
        delivery {
          description
          socialMediaSelected
          typeOfSocialNetwork
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
        }
        interests {
          categoryContest
          categoryPrize
          musicalGenre
          sports
          political
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
          audience {
            nextToken
          }
          participants {
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
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          delivery {
            description
            socialMediaSelected
            typeOfSocialNetwork
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
          }
          interests {
            categoryContest
            categoryPrize
            musicalGenre
            sports
            political
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
      video {
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
          audience {
            nextToken
          }
          participants {
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
          audience {
            nextToken
          }
          participants {
            nextToken
          }
        }
        createdAt
      }
      nextToken
    }
    statistics {
      userSharing {
        name
        idUserSharing
        whereItHasBeenShared
        createdAt
        avatar
      }
      userLikes {
        name
        idUserLike
        createdAt
        avatar
      }
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
          audience {
            nextToken
          }
          participants {
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
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          delivery {
            description
            socialMediaSelected
            typeOfSocialNetwork
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
          }
          interests {
            categoryContest
            categoryPrize
            musicalGenre
            sports
            political
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
      video {
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
          audience {
            nextToken
          }
          participants {
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
          audience {
            nextToken
          }
          participants {
            nextToken
          }
        }
        createdAt
      }
      nextToken
    }
    statistics {
      userSharing {
        name
        idUserSharing
        whereItHasBeenShared
        createdAt
        avatar
      }
      userLikes {
        name
        idUserLike
        createdAt
        avatar
      }
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
          audience {
            nextToken
          }
          participants {
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
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          delivery {
            description
            socialMediaSelected
            typeOfSocialNetwork
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
          }
          interests {
            categoryContest
            categoryPrize
            musicalGenre
            sports
            political
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
      video {
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
          audience {
            nextToken
          }
          participants {
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
          audience {
            nextToken
          }
          participants {
            nextToken
          }
        }
        createdAt
      }
      nextToken
    }
    statistics {
      userSharing {
        name
        idUserSharing
        whereItHasBeenShared
        createdAt
        avatar
      }
      userLikes {
        name
        idUserLike
        createdAt
        avatar
      }
    }
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
        video {
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
      audience {
        items {
          JSONdata
          createContest {
            id
            category
            createdAt
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
          }
          createdAt
        }
        nextToken
      }
      statistics {
        userSharing {
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        userLikes {
          name
          idUserLike
          createdAt
          avatar
        }
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
        video {
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
      audience {
        items {
          JSONdata
          createContest {
            id
            category
            createdAt
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
          }
          createdAt
        }
        nextToken
      }
      statistics {
        userSharing {
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        userLikes {
          name
          idUserLike
          createdAt
          avatar
        }
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
        video {
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
      audience {
        items {
          JSONdata
          createContest {
            id
            category
            createdAt
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
          }
          createdAt
        }
        nextToken
      }
      statistics {
        userSharing {
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        userLikes {
          name
          idUserLike
          createdAt
          avatar
        }
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
        video {
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
      audience {
        items {
          JSONdata
          createContest {
            id
            category
            createdAt
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
          }
          createdAt
        }
        nextToken
      }
      statistics {
        userSharing {
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        userLikes {
          name
          idUserLike
          createdAt
          avatar
        }
      }
    }
    createdAt
  }
}
`;
export const updateParticipants = `mutation UpdateParticipants($input: UpdateParticipantsInput!) {
  updateParticipants(input: $input) {
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
        video {
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
      audience {
        items {
          JSONdata
          createContest {
            id
            category
            createdAt
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
          }
          createdAt
        }
        nextToken
      }
      statistics {
        userSharing {
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        userLikes {
          name
          idUserLike
          createdAt
          avatar
        }
      }
    }
    createdAt
  }
}
`;
export const deleteParticipants = `mutation DeleteParticipants($input: DeleteParticipantsInput!) {
  deleteParticipants(input: $input) {
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
        video {
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
      audience {
        items {
          JSONdata
          createContest {
            id
            category
            createdAt
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
          }
          createdAt
        }
        nextToken
      }
      statistics {
        userSharing {
          name
          idUserSharing
          whereItHasBeenShared
          createdAt
          avatar
        }
        userLikes {
          name
          idUserLike
          createdAt
          avatar
        }
      }
    }
    createdAt
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
          audience {
            nextToken
          }
          participants {
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
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          delivery {
            description
            socialMediaSelected
            typeOfSocialNetwork
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
          }
          interests {
            categoryContest
            categoryPrize
            musicalGenre
            sports
            political
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
      socialMediaHandle {
        facebook
        twitter
        instagram
        snapchat
      }
    }
    category
    general {
      price
      nameOfPrize
      description
      instructions {
        msg
        typeContentInstructionsValue
      }
      socialMediaHandle {
        facebook
        twitter
        instagram
        snapchat
      }
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
    delivery {
      description
      socialMediaSelected
      typeOfSocialNetwork
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
          audience {
            nextToken
          }
          participants {
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
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          delivery {
            description
            socialMediaSelected
            typeOfSocialNetwork
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
          }
          interests {
            categoryContest
            categoryPrize
            musicalGenre
            sports
            political
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
      socialMediaHandle {
        facebook
        twitter
        instagram
        snapchat
      }
    }
    category
    general {
      price
      nameOfPrize
      description
      instructions {
        msg
        typeContentInstructionsValue
      }
      socialMediaHandle {
        facebook
        twitter
        instagram
        snapchat
      }
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
    delivery {
      description
      socialMediaSelected
      typeOfSocialNetwork
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
          audience {
            nextToken
          }
          participants {
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
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          delivery {
            description
            socialMediaSelected
            typeOfSocialNetwork
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
          }
          interests {
            categoryContest
            categoryPrize
            musicalGenre
            sports
            political
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
      socialMediaHandle {
        facebook
        twitter
        instagram
        snapchat
      }
    }
    category
    general {
      price
      nameOfPrize
      description
      instructions {
        msg
        typeContentInstructionsValue
      }
      socialMediaHandle {
        facebook
        twitter
        instagram
        snapchat
      }
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
    delivery {
      description
      socialMediaSelected
      typeOfSocialNetwork
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
          audience {
            nextToken
          }
          participants {
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
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          delivery {
            description
            socialMediaSelected
            typeOfSocialNetwork
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
          }
          interests {
            categoryContest
            categoryPrize
            musicalGenre
            sports
            political
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
    }
    interests {
      categoryContest
      categoryPrize
      musicalGenre
      sports
      political
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
          audience {
            nextToken
          }
          participants {
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
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          delivery {
            description
            socialMediaSelected
            typeOfSocialNetwork
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
          }
          interests {
            categoryContest
            categoryPrize
            musicalGenre
            sports
            political
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
    }
    interests {
      categoryContest
      categoryPrize
      musicalGenre
      sports
      political
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
          audience {
            nextToken
          }
          participants {
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
          }
          category
          general {
            price
            nameOfPrize
            description
          }
          createdAt
          delivery {
            description
            socialMediaSelected
            typeOfSocialNetwork
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
          }
          interests {
            categoryContest
            categoryPrize
            musicalGenre
            sports
            political
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
    }
    interests {
      categoryContest
      categoryPrize
      musicalGenre
      sports
      political
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
