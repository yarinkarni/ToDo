using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ToDoWebAPI.Models
{
	public class TaskDB
	{
		static bool local = false;
		static string _conStr = null;

		static SqlConnection con;
		static SqlCommand command;

		static string strConLocal = ConfigurationManager.ConnectionStrings["strConLocal"].ConnectionString;

		static TaskDB()
		{

			_conStr = strConLocal;
			con = new SqlConnection(_conStr);
			command = new SqlCommand();
		}

		private static List<Task> ExecReader(string commandString)
		{
			List<Task> listToReturn = new List<Task>();

			command.Connection = con;
			command.CommandText = commandString;
			con.Open();
			SqlDataReader dataReader;

			dataReader = command.ExecuteReader();
			while (dataReader.Read())
			{
				var TaskID = (int)dataReader["TaskID"];
				var TaskDate = (DateTime)dataReader["TaskDate"];
				var TaskText = (string)dataReader["TaskText"];
				var TaskDone = (bool)dataReader["TaskDone"];
				listToReturn.Add(new Task(TaskID, TaskDate, TaskText, TaskDone));
			}

			con.Close();

			return listToReturn;
		}

		//READ ALL
		public static List<Task> GetAllTasks()
		{
			List<Task> listToReturn = ExecReader($"SELECT * FROM Tasks");
			return listToReturn;
		}

		//READ SPECIFIC BY CODE
		public static List<Task> GetDishByTaskID(int TaskID)
		{
			List<Task> listToReturn = ExecReader($"SELECT * FROM Tasks WHERE TaskID=  {TaskID}");
			return listToReturn;
		}

		//INSERT Dish
		public static int AddTask(DateTime TaskDate, string TaskText, bool TaskDone)
		{
			string d = $"{TaskDate.Year}-{TaskDate.Month}-{TaskDate.Day}";

			command.Connection = con;
			command.CommandText = $"INSERT INTO Tasks (TaskDate,TaskText,TaskDone) VALUES(N'{d}' , '{TaskText}', '{TaskDone}') ";

			con.Open();
			int rowsAffected = command.ExecuteNonQuery();
			int newDishID = -1;
			//to get the new IDENTITY
			command.CommandText = "SELECT SCOPE_IDENTITY() as [IDENTITY]";
			SqlDataReader dataReader;
			dataReader = command.ExecuteReader();
			while (dataReader.Read())
				newDishID = int.Parse(dataReader["IDENTITY"].ToString());
			command.Connection.Close();
			return newDishID;

		}

		//UPDATE FAMILY USER DETAILS
		public static int UpdateTasks(DateTime TaskDate, string TaskText, bool TaskDone, int TaskID)
		{
			string d = $"{TaskDate.Year}-{TaskDate.Month}-{TaskDate.Day}";

			command.Connection = con;
			command.CommandText = $@"UPDATE Tasks SET TaskDate=N'{d}', TaskText='{TaskText}' ,
								  TaskDone='{TaskDone}' 
								  WHERE TaskID={TaskID}";

			con.Open();
			int rowsAffected = command.ExecuteNonQuery();
			command.Connection.Close();

			return rowsAffected;
		}

		//DELETE
		public static int DeleteTasks(int TaskID)
		{


			command.Connection = con;
			command.CommandText = $@"DELETE FROM Tasks WHERE TaskID = {TaskID}";

			con.Open();
			int rowsAffected = command.ExecuteNonQuery();
			command.Connection.Close();

			return rowsAffected;
		}
	}
}