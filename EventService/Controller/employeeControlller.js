const EmployeeSchema = require('../Model/employeeSchema')





const isUpcomingEventWithinLimit = (eventDate, todayDate, extend) => {
  const date = new Date(eventDate);
  const today = new Date(todayDate);
  const limit = new Date(today);
  limit.setDate(today.getDate() + extend);
  const birthDay = date.getDate();
  const birthMonth = date.getMonth();

  if (birthMonth === today.getMonth() && birthMonth === limit.getMonth()) {
    return birthDay >= today.getDate() && birthDay <= limit.getDate();
  }
  if (birthMonth === today.getMonth() && birthMonth === limit.getMonth()) {
    return birthDay >= today.getDate() && birthDay <= limit.getDate();
  }
  if (birthMonth === today.getMonth()) {
    return birthDay >= today.getDate();
  }
  if (birthMonth === limit.getMonth()) {
    return birthDay <= limit.getDate();
  }
  const overflown = limit.getFullYear() > today.getFullYear();
  if (overflown) {
    return birthMonth > today.getMonth() || birthMonth < limit.getMonth();
  }
  return birthMonth > today.getMonth() && birthMonth < limit.getMonth();
};




exports.getUpcomingBirthdays = async (req, res) => {
  try {
    const days = req.params.days;
    const today = new Date();


    const employee = await EmployeeSchema.find();


    const ans = [];

    for (var i = 0; i < employee.length; i++) {
      const eventDate = employee[i].dob;


      switch (days) {
        case "7days":

          if (isUpcomingEventWithinLimit(eventDate, today, 7)) {
            ans.push(employee[i]);
          }

          break;
        case "14days":

          if (isUpcomingEventWithinLimit(eventDate, today, 14)) {
            ans.push(employee[i]);
          }

          break;
        case "1month":
          if (isUpcomingEventWithinLimit(eventDate, today, 30)) {
            ans.push(employee[i]);
          }
          break;
        case "6months":
          if (isUpcomingEventWithinLimit(eventDate, today, 180)) {
            ans.push(employee[i]);
          }
          break;

        default:
          if (isUpcomingEventWithinLimit(eventDate, today, 0)) {
            ans.push(employee[i]);
          }
          break;
      }







    }

    res.status(200).json(ans);

  } catch (error) {
    console.error('Error in retreving data:', error);
    res.status(500).json({ error: 'Error in retreving data:' });
  }
};


exports.getUpcomingAnniversary = async (req, res) => {
  try {
    const days = req.params.days;
    const today = new Date();

    const employee = await EmployeeSchema.find();

    const ans = [];

    for (var i = 0; i < employee.length; i++) {
      var eventDate = employee[i].dateofjoining;

      switch (days) {
        case "7days":

          if (isUpcomingEventWithinLimit(eventDate, today, 7)) {
            ans.push(employee[i]);
          }

          break;
        case "14days":

          if (isUpcomingEventWithinLimit(eventDate, today, 14)) {
            ans.push(employee[i]);
          }

          break;
        case "1month":
          if (isUpcomingEventWithinLimit(eventDate, today, 30)) {
            ans.push(employee[i]);
          }
          break;
        case "6months":
          if (isUpcomingEventWithinLimit(eventDate, today, 180)) {
            ans.push(employee[i]);
          }
          break;

        default:
          if (isUpcomingEventWithinLimit(eventDate, today, 0)) {
            ans.push(employee[i]);
          }
          break;
      }

    }

    res.status(200).json(ans);

  } catch (error) {
    console.error('Error in retreving data:', error);
    res.status(500).json({ error: 'Error in retreving data:' });
  }
};

