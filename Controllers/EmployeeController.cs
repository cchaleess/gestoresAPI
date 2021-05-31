using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using gestoresAPI.Models;
using System;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace gestoresAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;


        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)

        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]

        public JsonResult Get()
        {
            String query = @"
                            select id, name, department, 
                            convert(varchar(10),dateofjoining,120) as dateofjoining
                            ,photofilename from dbo.Employee";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult(table);
        }

        [HttpPost]

        public JsonResult Post(Employee emp)
        {

            String query = @"
                            insert into dbo.Employee (name,department,dateofjoining,photofilename) values(
                            '" + emp.name + @"',
                            '" + emp.department + @"',
                            '" + emp.dateofjoining + @"',
                            '" + emp.department + @"'
                            )";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult(" Empleado Agregado");
        }


        [HttpPut]

        public JsonResult Put(Employee emp)
        {

            String query = @"
                            update dbo.Employee set 
                            name = '" + emp.name + @"',
                            department = '" + emp.department + @"',
                            dateofjoining = '" + emp.dateofjoining + @"',
                            photofilename = '" + emp.photofilename + @"' 

                            where id = " + emp.id + @"
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult("Modificación exitosa");
        }

        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {

            String query = @" delete from dbo.Employee where id =" + id + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult("Borrado exitoso");
        }

        [Route ("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var phsycalPath = _env.ContentRootPath+ "/Photos/" + filename;
 
                using (var stream = new FileStream(phsycalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);

            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        [Route("GetAllDepartmentNames")]

        public JsonResult GetAllDepartmentNames()
        {
            String query = @"
                            select name from dbo.Deparment";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult(table);
        }

    }

}
