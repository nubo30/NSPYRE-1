// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateCreateContest = `subscription OnCreateCreateContest {
  onCreateCreateContest {
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
export const onUpdateCreateContest = `subscription OnUpdateCreateContest {
  onUpdateCreateContest {
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
export const onDeleteCreateContest = `subscription OnDeleteCreateContest {
  onDeleteCreateContest {
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
export const onCreateViewsVideo = `subscription OnCreateViewsVideo {
  onCreateViewsVideo {
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
export const onUpdateViewsVideo = `subscription OnUpdateViewsVideo {
  onUpdateViewsVideo {
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
export const onDeleteViewsVideo = `subscription OnDeleteViewsVideo {
  onDeleteViewsVideo {
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
export const onCreateUsersSharing = `subscription OnCreateUsersSharing {
  onCreateUsersSharing {
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
export const onUpdateUsersSharing = `subscription OnUpdateUsersSharing {
  onUpdateUsersSharing {
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
export const onDeleteUsersSharing = `subscription OnDeleteUsersSharing {
  onDeleteUsersSharing {
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
export const onCreateUsersLikes = `subscription OnCreateUsersLikes {
  onCreateUsersLikes {
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
export const onUpdateUsersLikes = `subscription OnUpdateUsersLikes {
  onUpdateUsersLikes {
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
export const onDeleteUsersLikes = `subscription OnDeleteUsersLikes {
  onDeleteUsersLikes {
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
export const onCreateAudience = `subscription OnCreateAudience {
  onCreateAudience {
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
export const onUpdateAudience = `subscription OnUpdateAudience {
  onUpdateAudience {
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
export const onDeleteAudience = `subscription OnDeleteAudience {
  onDeleteAudience {
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
export const onCreateParticipants = `subscription OnCreateParticipants {
  onCreateParticipants {
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
export const onUpdateParticipants = `subscription OnUpdateParticipants {
  onUpdateParticipants {
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
export const onDeleteParticipants = `subscription OnDeleteParticipants {
  onDeleteParticipants {
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
export const onCreateViewsParticipants = `subscription OnCreateViewsParticipants {
  onCreateViewsParticipants {
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
export const onUpdateViewsParticipants = `subscription OnUpdateViewsParticipants {
  onUpdateViewsParticipants {
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
export const onDeleteViewsParticipants = `subscription OnDeleteViewsParticipants {
  onDeleteViewsParticipants {
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
export const onCreateShareParticipants = `subscription OnCreateShareParticipants {
  onCreateShareParticipants {
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
export const onUpdateShareParticipants = `subscription OnUpdateShareParticipants {
  onUpdateShareParticipants {
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
export const onDeleteShareParticipants = `subscription OnDeleteShareParticipants {
  onDeleteShareParticipants {
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
export const onCreateLikesToParticipants = `subscription OnCreateLikesToParticipants {
  onCreateLikesToParticipants {
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
export const onUpdateLikesToParticipants = `subscription OnUpdateLikesToParticipants {
  onUpdateLikesToParticipants {
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
export const onDeleteLikesToParticipants = `subscription OnDeleteLikesToParticipants {
  onDeleteLikesToParticipants {
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
export const onCreateCommentsToParticipants = `subscription OnCreateCommentsToParticipants {
  onCreateCommentsToParticipants {
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
export const onUpdateCommentsToParticipants = `subscription OnUpdateCommentsToParticipants {
  onUpdateCommentsToParticipants {
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
export const onDeleteCommentsToParticipants = `subscription OnDeleteCommentsToParticipants {
  onDeleteCommentsToParticipants {
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
export const onCreateContestCategory = `subscription OnCreateContestCategory {
  onCreateContestCategory {
    id
    name
    picture
    category
  }
}
`;
export const onUpdateContestCategory = `subscription OnUpdateContestCategory {
  onUpdateContestCategory {
    id
    name
    picture
    category
  }
}
`;
export const onDeleteContestCategory = `subscription OnDeleteContestCategory {
  onDeleteContestCategory {
    id
    name
    picture
    category
  }
}
`;
export const onCreatePrizesCategory = `subscription OnCreatePrizesCategory {
  onCreatePrizesCategory {
    id
    name
    picture
    category
  }
}
`;
export const onUpdatePrizesCategory = `subscription OnUpdatePrizesCategory {
  onUpdatePrizesCategory {
    id
    name
    picture
    category
  }
}
`;
export const onDeletePrizesCategory = `subscription OnDeletePrizesCategory {
  onDeletePrizesCategory {
    id
    name
    picture
    category
  }
}
`;
export const onCreateSubmitPrize = `subscription OnCreateSubmitPrize {
  onCreateSubmitPrize {
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
export const onUpdateSubmitPrize = `subscription OnUpdateSubmitPrize {
  onUpdateSubmitPrize {
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
export const onDeleteSubmitPrize = `subscription OnDeleteSubmitPrize {
  onDeleteSubmitPrize {
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
export const onCreateEngage = `subscription OnCreateEngage {
  onCreateEngage {
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
export const onUpdateEngage = `subscription OnUpdateEngage {
  onUpdateEngage {
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
export const onDeleteEngage = `subscription OnDeleteEngage {
  onDeleteEngage {
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
export const onCreateNotifications = `subscription OnCreateNotifications {
  onCreateNotifications {
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
export const onUpdateNotifications = `subscription OnUpdateNotifications {
  onUpdateNotifications {
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
export const onDeleteNotifications = `subscription OnDeleteNotifications {
  onDeleteNotifications {
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
