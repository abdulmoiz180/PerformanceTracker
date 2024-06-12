const reducer = (state, action) => {
    switch (action.type) {
      case "UpdateField":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "increment_Shots":
        return {
          ...state,
          shots: state.shots + 1,
        };
      case "increment_SOT":
        return {
          ...state,
          ShotOnTarget: state.ShotOnTarget + 1,
        };
      case "increment_CPasses":
        return {
          ...state,
          CompletePasses: state.CompletePasses + 1,
          TotalPasses: state.TotalPasses + 1,
        };
      case "increment_TPasses":
        return {
          ...state,
          TotalPasses: state.TotalPasses + 1,
        };
  
      case "increment_Goals":
        return {
          ...state,
          Goals: state.Goals + 1,
        };
  
      case "increment_Assists":
        return {
          ...state,
          Assists: state.Assists + 1,
        };
      case "average_position":
        return {
          ...state,
          averagePosition: action.payload,
        };
      default:
        break;
    }
  };
export default reducer   