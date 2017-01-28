export function FriendsDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/friends/friends.html',
    scope: { },
    controller: FriendsController,
    controllerAs: 'friends'
  };

  return directive;
}

class FriendsController {
  /*@ngInject*/
  constructor(FriendsService, ValidateService, $log){
    this.$log = $log;
    this.error;
    this.friend = {};
    this.list = [];
    this.service = FriendsService
    this.validate = ValidateService;
    this.isUpdate = false;

    this.service.getList().then(friends => {
      this.list = friends.data;
    });

  }

  onHandleChange() {
    this.error = undefined;
  }

  addFriend(friend) {
    const error = this.validate.friend(friend);
    if (friend && !error) {
      this.service.save(friend).then((resFriend) => {
        this.friend = undefined;
        this.list.push(resFriend.data);
      }, (error) => {
        this.$log.info(this.error = error.data.error);
      });

    } else {
      this.error = error.error;
    }
  }

  updateFriend(friend) {
    const error = this.validate.friend(friend);
    if (friend && !error) {
      this.service.update(friend).then(() => {
        this.friend   = undefined;
        this.isUpdate = false;
      }, (error) => {
        this.$log.info(this.error = error.data.error);
      });
    } else {
      this.error = error.error;
    }
  }

  editFriend(friend) {
    if (friend) {
      this.friend   = friend;
      this.isUpdate = true;
    }
  }

  cancelFriend() {
    this.isUpdate = false;
    this.friend   = undefined;
    this.service.getList().then(friends => {
      this.list = friends.data;
    });
  }

  deleteFriend(friend, index) {
    if (friend) {
      this.service.deleteFriend(friend).then(() => {
        this.list.splice(index, 1);
      }, function(err) {
        this.$log.info(err);
      });
    }
  }

  friendShip() {
    if (this.list < 4 ) {
      this.error = 'O mínimo de 4 participantes para sortear!';
    } else {
      this.service.bingo().then(res => {
        this.$log.info(res);
      }, err => {
        this.$log.info(err);
      })
    }
  }

}
