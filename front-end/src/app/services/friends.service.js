export class FriendsService {

  constructor($http) {
    this.$http = $http;
  }

  save(friend) {
    return this.$http.post('http://localhost:3090/', friend);
  }

  update(friend) {
    return this.$http.put(`http://localhost:3090/${friend._id}`, friend);
  }

  getList() {
    return this.$http.get('http://localhost:3090');
  }

  deleteFriend(friend) {
    return this.$http.delete(`http://localhost:3090/${friend._id}`);
  }

  bingo() {
    return this.$http.post('http://localhost:3090/bingo');
  }

}

FriendsService.$inject = ['$http'];
