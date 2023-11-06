// [CRUD] CREATE: Add new user account
// [CRUD] CREATE: 사용자 계정 새로 만들기

const signupUser = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const bio = req.body.bio ?? null;
    const social = req.body.social ?? null;
    const imgUrl = req.body.imgUrl ?? null;

    // 
    // 이메일 중복 여부 체크하기
    const foundAccount = await UserModel.findOne({ email: email });
    if(foundAccount){
      throw new Error("입력하신 이메일에 해당되는 계정이 이미 존재합니다.");
    }

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
      bio,
      social,
      imgUrl,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
    return;
  } catch (error) {
    next(error);
  }
};



// [CRUD] READ: Retrieve user information
// [CRUD] READ: 사용자 정보 가져오기

const loginUser = async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
    return;
  } catch (error) {
    next(error);
  }
};

/*
[SUSPENDED] Business logic not yet implemented
[일시중지] 적용할 비즈니스 로직이 아직 없습니다.

const getAllUsers = async (req, res, next) => {
  try {

    // Set initial page and limit value for server-side offset pagination, and apply input data for query
    // server-side offset pagination을 위한 page와 limit의 초기값을 지정해주고, 쿼리 입력값을 반영해줍니다.
    const { page = 1, limit = 10 } = req.query;
     
    const paginatedUsers = await userAuthService.getUsers(page, limit);

    if (paginatedUsers.errorMessage) {
      throw new Error(paginatedUsers.errorMessage);
    }

    res.status(200).send(paginatedUsers);
    return;

  } catch (error) {
    next(error);
  }
};
*/

const getCurrentUser = async (req, res, next) => {
  try {
    // 
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const user_id = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
    return;
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const currentUserInfo = await userAuthService.getUserInfo({ user_id });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
    return;
  } catch (error) {
    next(error);
  }
};



// [CRUD] UPDATE: Update user account
// [CRUD] UPDATE: 사용자 계정 최신화

const updateUser = async (req, res, next) => {
  try {
    // URI로부터 사용자 id를 추출함.
    const userId = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    const bio = req.body.bio ?? null;
    const social = req.body.social ?? null;
    const imgUrl = req.body.imgUrl ?? null;

    const toUpdate = { name, email, password, description, social, imgUrl };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
    return;
  } catch (error) {
    next(error);
  }
};


const changePassword = async (req, res, next) => {
  try{
    const currentUserId = req.currentUserId;
    const userId = req.params.userId;
    const email = req.body.email;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const newPasswordConfirm = req.body.newPasswordConfirm
    const changedPassword = await userAuthService.setPassword({
      email, 
      currentPassword, 
      newPassword, 
      newPasswordConfirm}
    )
    
    // 현재 로그인한 사용자의 id와 url로 전달받은 userId가 다를 경우
    if (currentUserId !== userId){
      throw new Error("현재 로그인한 사용자가 아닙니다.")
    }
    if (changedPassword.error){
      return(changedPassword.error)
    }
    
    res.status(200).json(changedPassword);
    return;
  } catch (error) {
    next(error);
  }
};


const resetPassword = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
    }

    const inputEmail = req.body.inputEmail ?? null;
    const inputProof = req.body.inputProof ?? null;

    const renewedPassword = await userAuthService.resetPassword({ inputEmail, inputProof });

    if (renewedPassword.error) {
      throw new Error(renewedPassword.error);
    }

    res.status(200).send("사용자의 비밀번호 초기화가 완료되었습니다.");
    return;
  }
  catch(error){
    next(error);
  }
};



// [CRUD] DELETE: Delete user account
// [CRUD] DELETE: 사용자 계정 삭제

const deleteUser = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
    }

    const currentUserId = req.currentUserId ?? null;
    const inputEmail = req.body.inputEmail ?? null;
    const inputPassword = req.body.inputPassword ?? null;

    const deletedUser = await userAuthService.deleteUser({ 
      currentUserId, 
      inputEmail, 
      inputPassword });

    if (deletedUser.error) {
      throw new Error(deletedUser.error);
    }

    res.status(200).send("사용자 계정 삭제가 완료되었습니다.");
    return;
  }
  catch(error){
    next(error);
  }
};

export {
  signupUser,
  loginUser,
  getCurrentUser,
  getUser,
  updateUser,
  changePassword,
  resetPassword,
  deleteUser
}