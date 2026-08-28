// Ngan cua so console hien kem tren Windows o ban release.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    forely_desktop_lib::run()
}
