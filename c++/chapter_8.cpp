//inheritance, encapsulation, abstraction, and polymorphism
#include <iostream>
#include <cassert>

class Date
{
public:
  int m_month;
  int m_day;
  int m_year;

  void SetDate(int month, int day, int year)
  {
    m_month = month;
    m_day = day;
    m_year = year;
  }
};

class Fraction
{
private:
  int m_nNumerator;
  int m_nDenominator;

public:
  //constructor
  Fraction(int nNumerator=0, int nDenominator=1)
  {
    assert(nDenominator != 0);
    m_nNumerator = nNumerator;
    m_nDenominator = nDenominator;
  }

  int GetNumerator() { return m_nNumerator; }
  int GetDenominator() { return m_nDenominator; }
  double GetFraction() { return static_cast<double>(m_nNumerator) / m_nDenominator; }
};

int main() {
  using namespace std;
  Date cToday;
  cToday.SetDate(10, 14, 2020);
  cout << cToday.m_year << endl;
  Fraction frac(5,3);
  cout << frac.GetFraction() << endl;
}

//c++ provides 3 different access specifier keywords: public, private, and protected

//difference between a class and a struct?
//a class defaults its members to private
//a struct defaults its members to public

//access functions and encapsulation
  //access functions typically come in two types: getters and setters

  //why make a member variable private if we are going to provide public access functions to it?
    //encapsulation - hiding the details of how something is implemented and instead exposing an interface to the user

    //encapsulation gives us the ability to change our classes without breaking all the code that uses them - paramount to code maintainability

//constructors
  //a constructor is a special kind of class member function that is executed when an object of that is instantiated
  //default constructor vs constructors with parameters => can coexist in the same class due to function overloading
  //can set default values
