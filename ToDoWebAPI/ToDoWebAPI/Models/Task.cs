using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoWebAPI.Models
{
    public class Task
    {
        public int TaskID { get; set; }
        public DateTime TaskDate { get; set; }
        public string TaskText { get; set; }
        public bool TaskDone { get; set; }
        public Task()
        {

        }
        public Task(int taskID, DateTime taskDate, string taskText, bool taskDone)
        {
            TaskID = taskID;
            TaskDate = taskDate;
            TaskText = taskText;
            TaskDone = taskDone;
        }
        public override string ToString()
        {
            return $"{ TaskID},{TaskDate },{TaskText},{TaskDone}";
        }
    }
}